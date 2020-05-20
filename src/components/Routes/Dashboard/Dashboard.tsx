import React, { useState, useContext, useEffect } from "react";
import { Dai as DaiIcon } from "@rimble/icons";
import { providers, Contract } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import BTMarketContract from "abis/BTMarket.json";
import { injected, portis } from "utils/connectors";
import Container from "components/Routes/RoutesContainer";
import { ModalContext } from "store/context/ModalContext";
import { ContractContext } from "store/context/ContractContext";
import {
  Content,
  Top,
  Title,
  SVG,
  Wrapper,
  Button,
  GetDaiButton,
} from "./Dashboard.style";
import MarketCard from "./MarketCard";

declare let window: any;

// const connectorsByName: { [name: string]: any } = {
//   Injected: injected,
//   Portis: portis,
// };

const Dashboard = () => {
  const { modalState, modalDispatch } = useContext(ModalContext);
  const { contractState } = useContext(ContractContext);
  const factoryContract = contractState[0];
  const daiContract = contractState[1];
  const { active } = useWeb3React<Web3Provider>();

  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [marketContractInstance, setMarketContractInstance] = useState<any>(
    null
  );

  useEffect(() => {
    const provider = new providers.Web3Provider(window.web3.currentProvider);
    const wallet = provider.getSigner();

    getMostRecentMarket(factoryContract, wallet);
  }, [factoryContract]);

  const getMostRecentMarket = async (factoryContract: any, wallet: any) => {
    try {
      let deployedMarkets = await (factoryContract as any).getMarkets();
      if (deployedMarkets.length !== 0) {
        let mostRecentlyDeployedAddress =
          deployedMarkets[deployedMarkets.length - 1];
        console.log(
          "Most Recently Deployed Address:",
          mostRecentlyDeployedAddress
        );

        // const usingPortis = portis.portis.provider
        // const Provider = new providers.Web3Provider(
        //   portis.portis.provider
        // );
        // const wallet = Provider.getSigner();

        const instance: any = new Contract(
          mostRecentlyDeployedAddress,
          BTMarketContract.abi,
          wallet
        );

        const contractPauseStatus = await instance.paused();
        setIsPaused(contractPauseStatus);

        setMarketContractInstance(instance);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Content>
        <Top>
          <Title>Dashboard</Title>
          <SVG
            fill="#000000"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            onClick={() =>
              modalDispatch({
                type: "TOGGLE_EMAIL_MODAL",
                payload: !modalState.emailModalIsOpen,
              })
            }
          >
            <path d="M 12 2 C 11.172 2 10.5 2.672 10.5 3.5 L 10.5 4.1953125 C 7.9131836 4.862095 6 7.2048001 6 10 L 6 15 L 18 15 L 18 10 C 18 7.2048001 16.086816 4.862095 13.5 4.1953125 L 13.5 3.5 C 13.5 2.672 12.828 2 12 2 z M 5 17 A 1.0001 1.0001 0 1 0 5 19 L 10.269531 19 A 2 2 0 0 0 10 20 A 2 2 0 0 0 12 22 A 2 2 0 0 0 14 20 A 2 2 0 0 0 13.728516 19 L 19 19 A 1.0001 1.0001 0 1 0 19 17 L 5 17 z" />
          </SVG>
        </Top>

        <Wrapper>
          {marketContractInstance && !isPaused ? (
            <MarketCard
              daiContract={daiContract}
              marketContract={marketContractInstance}
            />
          ) : (
            <Button
              disabled={!active}
              onClick={() =>
                modalDispatch({
                  type: "TOGGLE_CREATE_MARKET_MODAL",
                  payload: !modalState.createMarketModalIsOpen,
                })
              }
            >
              Create Market
            </Button>
          )}

          <GetDaiButton
            onClick={() =>
              modalDispatch({
                type: "TOGGLE_TRADE_MODAL",
                payload: !modalState.tradeModalIsOpen,
              })
            }
          >
            <DaiIcon />
          </GetDaiButton>
        </Wrapper>
      </Content>
    </Container>
  );
};

export default Dashboard;
