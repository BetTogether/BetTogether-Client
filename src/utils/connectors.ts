import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { PortisConnector } from "@web3-react/portis-connector";

const PORTIS_KEY = "357138f4-2cb4-4cc2-8a02-306d7bb86ceb";

export const injected = new InjectedConnector({
  supportedChainIds: [42],
});

export const portis = new PortisConnector({
  dAppId: PORTIS_KEY,
  networks: [42],
});

export function getNetwork(defaultChainId = 42): NetworkConnector {
  return new NetworkConnector({
    urls: `https://kovan.infura.io/v3/${process.env.INFURA_ID}`,
    defaultChainId,
    pollingInterval: 15 * 1000,
  });
}
