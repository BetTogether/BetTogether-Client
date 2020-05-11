import React, { useState, useContext, useEffect } from "react";
import {
  Content,
  Top,
  Title,
  SVG,
  Wrapper,
  Button,
  GetDaiButton,
} from "./Dashboard.style";
import Container from "components/Routes/RoutesContainer";
import { LayoutContext } from "store/Context";
import Card from "./Card";
import { ethers } from "ethers";
import BTMarketContract from "contracts/BTMarket.json";
import BTMarketFactoryContract from "contracts/BTMarketFactory.json";
import { Dai } from "@rimble/icons";
import { Tooltip } from "rimble-ui";
import { DaiABI } from "contracts/DaiABI";
import addresses, { KOVAN_ID } from "contracts/addresses";

const Dashboard = () => {
  const { state, dispatch } = useContext(LayoutContext);
  const [daiContractInstance, setDaiContractInstance] = useState("");
  const [factoryContractInstance, setFactoryContractInstance] = useState(null);
  const DaiAddressKovan = addresses[KOVAN_ID].tokens.DAI;
  const marketFactoryAddressKovan = addresses[KOVAN_ID].marketFactory;
  const [marketInstance, setMarketInstance] = useState(null);

  const getDai = () =>
    dispatch({ type: "TOGGLE_TRADE_MODAL", payload: !state.tradeModalIsOpen });

  const openEmailModal = () => {
    dispatch({ type: "TOGGLE_EMAIL_MODAL", payload: !state.emailModalIsOpen });
  };

  //   let MarketList = Object.keys(contracts)
  //     .filter((contractName) => contractName !== "MarketFactory")
  //     .reverse();

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(
      (window as any).web3.currentProvider
    );
    const wallet = provider.getSigner();
    // const contractAddress = "0xBECFc6F472798FD59020Eec49Df0F4799b4e0f2A";
    // const instance: any = new ethers.Contract(
    //   contractAddress,
    //   BTMarketContract.abi,
    //   wallet
    // );
    // setInstance(instance);

    const DaiInstance: any = new ethers.Contract(
      DaiAddressKovan,
      DaiABI,
      wallet
    );
    setDaiContractInstance(DaiInstance);

    const FactoryInstance: any = new ethers.Contract(
      marketFactoryAddressKovan,
      BTMarketFactoryContract.abi,
      wallet
    );
    setFactoryContractInstance(FactoryInstance);
  }, [DaiAddressKovan, marketFactoryAddressKovan]);

  useEffect(() => {
    (async () => {
      if (factoryContractInstance) {
        console.log("factoryContractInstance:", factoryContractInstance);
        const provider = new ethers.providers.Web3Provider(
          (window as any).web3.currentProvider
        );
        const wallet = provider.getSigner();

        let deployedMarkets = await (factoryContractInstance as any).getMarkets();
        let deployedMarketsLength = deployedMarkets.length;
        let mostRecentlyDeployedAddress =
          deployedMarkets[deployedMarketsLength - 1];

        console.log(
          "mostRecentlyDeployedAddress:",
          mostRecentlyDeployedAddress
        );
        const instance: any = new ethers.Contract(
          mostRecentlyDeployedAddress,
          BTMarketContract.abi,
          wallet
        );

        console.log("instance:", instance);
        setMarketInstance(instance);
      }
    })();
  }, [factoryContractInstance]);

  const createMarket = async (factory: any) => {
    console.log(factoryContractInstance);
    const DUMMY_MARKET_OPENING_TIME = 0;
    const DUMMY_MARKET_RESOLUTION_TIME = 0;
    const DUMMY_ARBITRATOR = "0x34A971cA2fd6DA2Ce2969D716dF922F17aAA1dB0";
    const DUMMY_EVENT_NAME = "Who will win the 2020 US Presidential Election?";
    const DUMMY_NUMBER_OF_OUTCOMES = 2;
    const DUMMY_TIMEOUT = 10;

    let contractInstance = await factory.createMarket(
      DUMMY_MARKET_OPENING_TIME,
      DUMMY_MARKET_RESOLUTION_TIME,
      DUMMY_ARBITRATOR,
      DUMMY_EVENT_NAME,
      DUMMY_NUMBER_OF_OUTCOMES,
      DUMMY_TIMEOUT
    );

    setMarketInstance(contractInstance);
  };

  return (
    <Container>
      <Content>
        <Top>
          <Title>Dashboard</Title>
          <Tooltip message="Send a reminder email" placement="left">
            <SVG
              fill="#000000"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              onClick={() => openEmailModal()}
            >
              <path d="M 12 2 C 11.172 2 10.5 2.672 10.5 3.5 L 10.5 4.1953125 C 7.9131836 4.862095 6 7.2048001 6 10 L 6 15 L 18 15 L 18 10 C 18 7.2048001 16.086816 4.862095 13.5 4.1953125 L 13.5 3.5 C 13.5 2.672 12.828 2 12 2 z M 5 17 A 1.0001 1.0001 0 1 0 5 19 L 10.269531 19 A 2 2 0 0 0 10 20 A 2 2 0 0 0 12 22 A 2 2 0 0 0 14 20 A 2 2 0 0 0 13.728516 19 L 19 19 A 1.0001 1.0001 0 1 0 19 17 L 5 17 z" />
            </SVG>
          </Tooltip>
        </Top>

        <Wrapper>
          {/* {MarketList.length !== 0 &&
            MarketList.map((Market) => (
              <Card
                key={Market}
                marketContractName={Market}
                owner={owner}
              />
            ))} */}

          {marketInstance && (
            // console.log("marketInstance:", marketInstance)
            <Card
              key={1}
              daiContract={daiContractInstance}
              marketContract={marketInstance}
            />
          )}

          <Button onClick={() => createMarket(factoryContractInstance)}>
            Create New Contract
          </Button>

          <GetDaiButton onClick={() => getDai()}>
            <Dai />
          </GetDaiButton>
        </Wrapper>
      </Content>
    </Container>
  );
};

export default Dashboard;
