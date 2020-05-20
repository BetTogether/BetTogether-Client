import { InjectedConnector } from "@web3-react/injected-connector";
import { PortisConnector } from "@web3-react/portis-connector";
import { NetworkConnector } from "@web3-react/network-connector";

const PORTIS_API_KEY: string = process.env.REACT_APP_PORTIS_API_KEY!;

export const injected = new InjectedConnector({
  supportedChainIds: [42],
});

export const portis = new PortisConnector({
  dAppId: PORTIS_API_KEY as string,
  networks: [42],
});

export function getNetwork(defaultChainId = 42): NetworkConnector {
  return new NetworkConnector({
    urls: `https://kovan.infura.io/v3/${process.env.INFURA_ID}`,
    defaultChainId,
    pollingInterval: 15 * 1000,
  });
}
