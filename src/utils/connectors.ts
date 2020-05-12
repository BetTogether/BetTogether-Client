import { InjectedConnector } from "@web3-react/injected-connector";
import { PortisConnector } from "@web3-react/portis-connector";

const PORTIS_API_KEY: string = process.env.REACT_APP_PORTIS_API_KEY!;

export const injected = new InjectedConnector({
  supportedChainIds: [42],
});

export const portis = new PortisConnector({
  dAppId: PORTIS_API_KEY as string,
  networks: [1, 100],
});
