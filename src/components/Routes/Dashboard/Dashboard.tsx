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
  CreateMarketButton,
  Label,
  Input,
  Span,
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

          <Label>
            <Input
              type="checkbox"
              // checked={toggleSwitch}
              // onChange={() => setToggleSwitch(!toggleSwitch)}
            />

            <Span />
          </Label>
        </Top>

        <Wrapper>
          {marketContractInstance && !isPaused ? (
            <MarketCard
              daiContract={daiContract}
              marketContract={marketContractInstance}
            />
          ) : (
            <CreateMarketButton
              disabled={!active}
              onClick={() =>
                modalDispatch({
                  type: "TOGGLE_CREATE_MARKET_MODAL",
                  payload: !modalState.createMarketModalIsOpen,
                })
              }
            >
              Create Market
            </CreateMarketButton>
          )}

          {active && (
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
          )}
        </Wrapper>
      </Content>
    </Container>
  );
};

export default Dashboard;
