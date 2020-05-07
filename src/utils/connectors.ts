import { Connectors } from "web3-react";
import PortisApi from "@portis/web3";

const { InjectedConnector, PortisConnector } = Connectors;
const PORTIS_API_KEY: string = process.env.REACT_APP_PORTIS_API_KEY!;
const NETWORK: string = process.env.REACT_APP_NETWORK!;

const Injected = new InjectedConnector();

const Portis = new PortisConnector({
  api: PortisApi,
  dAppId: PORTIS_API_KEY,
  network: NETWORK,
});

export default {
  Injected,
  Portis,
};
