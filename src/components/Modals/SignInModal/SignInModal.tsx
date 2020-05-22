import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { injected, portis } from "utils/connectors";
import { useEscapeKey } from "utils/hooks";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import {
  Wrapper,
  Modal,
  IconButton,
  Buttons,
  StyledButton,
  Logo,
  ProviderWrapper,
  ProviderContent,
  ProviderTitle,
  ProviderDescription,
} from "./SignInModal.style";
import { ReactComponent as CrossIcon } from "assets/cross.svg";
import { ModalContext } from "store/context/ModalContext";
import portisLogo from "assets/portis.svg";
import metamaskLogo from "assets/metamask.svg";
import Spinner from "utils/spinner";

interface ISignInModalProps {
  isOpen: boolean;
}

const SignInModal = ({ isOpen }: ISignInModalProps) => {
  const { connector, activate, error } = useWeb3React<Web3Provider>();

  const { modalState, modalDispatch } = useContext(ModalContext);
  const [loading, setLoading] = useState(false);

  const connectorsByName: { [name: string]: AbstractConnector } = {
    Injected: injected,
    Portis: portis,
  };

  const toggleModal = () =>
    modalDispatch({
      type: "TOGGLE_SIGN_IN_MODAL",
      payload: !modalState.signInModalIsOpen,
    });

  // Escape key hook
  useEscapeKey(() =>
    modalDispatch({
      type: "TOGGLE_SIGN_IN_MODAL",
      payload: !modalState.signInModalIsOpen,
    })
  );

  //#region
  const node = useRef<any>(null);
  const handleClickOutside = useCallback(
    (event: any) => {
      if (event.composedPath().includes(node.current)) {
        return;
      }
      modalDispatch({
        type: "TOGGLE_SIGN_IN_MODAL",
        payload: !modalState.signInModalIsOpen,
      });
    },
    [modalDispatch, modalState.signInModalIsOpen]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [handleClickOutside, isOpen]);
  //#endregion

  const setConnector = async (currentConnector: any, name: any) => {
    console.log("name:", name);
    console.log("currentConnector:", currentConnector);

    setLoading(true);
    // setActivatingConnector(currentConnector);
    await activate(connectorsByName[name]);
    setLoading(false);
    toggleModal();
  };

  return (
    <Wrapper isOpen={isOpen}>
      <Modal ref={node}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <IconButton onClick={() => toggleModal()}>
              <CrossIcon />
            </IconButton>

            <Buttons>
              {Object.keys(connectorsByName).map((name) => {
                const currentConnector = connectorsByName[name];
                const connected = currentConnector === connector;
                // const disabled = connected || !!error;

                const LogoSrc = name === "Injected" ? metamaskLogo : portisLogo;

                return (
                  <ProviderWrapper key={name}>
                    <ProviderContent>
                      <StyledButton
                        onClick={() => setConnector(currentConnector, name)}
                      >
                        <Logo alt="logo" src={LogoSrc} />
                        <ProviderTitle>
                          {name === "Injected" ? "MetaMask" : name}
                        </ProviderTitle>
                        <ProviderDescription>
                          Connect with your{" "}
                          {name === "Injected" ? "MetaMask" : name} account
                        </ProviderDescription>
                      </StyledButton>
                    </ProviderContent>
                  </ProviderWrapper>
                );
              })}
            </Buttons>
          </>
        )}
      </Modal>
    </Wrapper>
  );
};

export default SignInModal;
