import React, { useState, useContext, useEffect } from "react";
import { Dai } from "@rimble/icons";
import { ethers, utils } from "ethers";
import { Tooltip } from "rimble-ui";

import BTMarketContract from "contracts/BTMarket.json";
import BTMarketFactoryContract from "contracts/BTMarketFactory.json";
import { DaiABI } from "contracts/DaiABI";
import addresses, { KOVAN_ID } from "contracts/addresses";
import Container from "components/Routes/RoutesContainer";
import { LayoutContext } from "store/Context";
import {
  Content,
  Top,
  Title,
  SVG,
  Wrapper,
  Button,
  GetDaiButton,
  Form,
  Input,
} from "./Dashboard.style";
import Card from "./Card";

const Dashboard = () => {
  const { state, dispatch } = useContext(LayoutContext);

  const daiAddress = addresses[KOVAN_ID].tokens.DAI;
  const factoryAddress = addresses[KOVAN_ID].marketFactory;
  const [factoryContract, setFactoryContract] = useState<any>(null);
  const [marketInstance, setMarketInstance] = useState<any>(null);
  const [daiContractInstance, setDaiContractInstance] = useState<any>(null);
  const [wallet, setWallet] = useState<any>(null);
  const [marketEventName, setMarketEventName] = useState<string>(
    "Who will win the 2020 US Presidential Election?"
  );
  const [optionOne, setOptionOne] = useState<string>("Trump");
  const [optionTwo, setOptionTwo] = useState<string>("Biden");
  const [numberOfTokenContracts, setNumberOfTokenContracts] = useState(0);

  const getDai = () =>
    dispatch({ type: "TOGGLE_TRADE_MODAL", payload: !state.tradeModalIsOpen });

  const openEmailModal = () =>
    dispatch({ type: "TOGGLE_EMAIL_MODAL", payload: !state.emailModalIsOpen });

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(
      (window as any).web3.currentProvider
    );
    const wallet = provider.getSigner();
    setWallet(wallet);

    const DaiInstance: any = new ethers.Contract(daiAddress, DaiABI, wallet);
    setDaiContractInstance(DaiInstance);

    const FactoryContract: any = new ethers.Contract(
      factoryAddress,
      BTMarketFactoryContract.abi,
      wallet
    );

    setFactoryContract(FactoryContract);
    getMostRecentMarket(FactoryContract, wallet);
  }, [daiAddress, factoryAddress]);

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

        const instance: any = new ethers.Contract(
          mostRecentlyDeployedAddress,
          BTMarketContract.abi,
          wallet
        );
        let tokenContractsCreated = await instance.tokenContractsCreated();
        setNumberOfTokenContracts(tokenContractsCreated.toNumber());

        setMarketInstance(instance);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createMarket = async (e: any) => {
    e.preventDefault();
    const MARKET_EVENT_NAME = marketEventName;
    const MARKET_OPENING_TIME = 0;
    const MARKET_RESOLUTION_TIME = 0;
    const ARBITRATOR = "0x34A971cA2fd6DA2Ce2969D716dF922F17aAA1dB0";
    const QUESTION = marketEventName;
    const NUMBER_OF_OUTCOMES = 2;

    await factoryContract.createMarket(
      MARKET_EVENT_NAME,
      MARKET_OPENING_TIME,
      MARKET_RESOLUTION_TIME,
      ARBITRATOR,
      QUESTION,
      NUMBER_OF_OUTCOMES
    );

    getMostRecentMarket(factoryContract, wallet);
  };

  const createTokens = async (e: any) => {
    e.preventDefault();

    if (numberOfTokenContracts === 0) {
      await marketInstance.createTokenContract("Donald Trump", "Donald Trump");
      await marketInstance.createTokenContract("Joe Biden", "Joe Biden");
    }
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
          {marketInstance && (
            <Card
              key={1}
              daiContract={daiContractInstance}
              marketContract={marketInstance}
              numberOfTokenContracts={numberOfTokenContracts}
            />
          )}
          <Form onSubmit={createMarket}>
            <Input
              type="text"
              value={marketEventName}
              onChange={(e) => setMarketEventName(e.target.value)}
            />
            <Button>Create New Market</Button>
          </Form>
          <Form onSubmit={createTokens}>
            <Input
              type="text"
              value={optionOne}
              onChange={(e) => setOptionOne(e.target.value)}
            />
            <Input
              type="text"
              value={optionTwo}
              onChange={(e) => setOptionTwo(e.target.value)}
            />
            <Button>Create New Tokens</Button>
          </Form>

          <GetDaiButton onClick={() => getDai()}>
            <Dai />
          </GetDaiButton>
        </Wrapper>
      </Content>
    </Container>
  );
};

export default Dashboard;
