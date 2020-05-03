import { Connectors } from "web3-react";
import PortisApi from "@portis/web3";

const { InjectedConnector, PortisConnector } = Connectors;
const PORTIS_API_KEY: string = process.env.REACT_APP_PORTIS_API_KEY!;

const Injected = new InjectedConnector();

const Portis = new PortisConnector({
  api: PortisApi,
  dAppId: PORTIS_API_KEY,
  network: process.env.REACT_APP_NETWORK,
});

export default {
  Injected,
  Portis,
};
