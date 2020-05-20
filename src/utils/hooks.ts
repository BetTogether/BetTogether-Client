import { useState, useEffect, useCallback, useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import { ethers } from "ethers";

import { injected } from "./connectors";

declare let window: any;

export function useEagerConnect() {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized)
        activate(injected, undefined, true).catch(() => setTried(true));
      else setTried(true);
    });
  }, [activate]); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) setTried(true);
  }, [tried, active]);

  return tried;
}

export function useInactiveListener(suppress: boolean = false) {
  const { active, error, activate } = useWeb3React();

  useEffect((): any => {
    const { ethereum } = window;

    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        console.log("Handling 'connect' event");
        activate(injected);
      };

      const handleChainChanged = (chainId: string | number) => {
        console.log("Handling 'chainChanged' event with payload", chainId);
        activate(injected);
      };

      const handleAccountsChanged = (accounts: string[]) => {
        console.log("Handling 'accountsChanged' event with payload", accounts);
        if (accounts.length > 0) activate(injected);
      };

      const handleNetworkChanged = (networkId: string | number) => {
        console.log("Handling 'networkChanged' event with payload", networkId);
        activate(injected);
      };

      ethereum.on("connect", handleConnect);
      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);
      ethereum.on("networkChanged", handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("connect", handleConnect);
          ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
          ethereum.removeListener("networkChanged", handleNetworkChanged);
        }
      };
    }
  }, [active, error, suppress, activate]);
}

export function useKeyPress({ targetKey }: any) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    // If pressed key is our target key then set to true
    function downHandler({ key }: any) {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    }

    // If released key is our target key then set to false
    const upHandler = ({ key }: any) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [targetKey]); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}

export function useOnClickOutside({ ref, handler }: any) {
  useEffect(
    () => {
      const listener = ({ event }: any) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}

export async function useNetworkId() {
  let provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
  let networkId = await provider.getNetwork();
  return networkId;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useContract(
  address?: string,
  ABI?: any,
  withSigner = false
): Contract | undefined {
  const { library, account } = useWeb3React();
  return useMemo(
    () =>
      !!address && !!ABI && !!library
        ? new Contract(
            address,
            ABI,
            withSigner ? library.getSigner(account).connectUnchecked() : library
          )
        : undefined,
    [address, ABI, withSigner, library, account]
  );
}
