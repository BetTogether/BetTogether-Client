import React, { useState, useContext, useEffect, FormEvent } from "react";
import { Dai as DaiIcon } from "@rimble/icons";
import { ethers } from "ethers";

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
  Form,
  Input,
} from "./Dashboard.style";
import MarketCard from "./MarketCard";
import { useWeb3React } from "@web3-react/core";

declare let window: any;

const connectorsByName: { [name: string]: any } = {
  Injected: injected,
  Portis: portis,
};

const Dashboard = () => {
  const { modalState, modalDispatch } = useContext(ModalContext);
  const { contractState, contractDispatch } = useContext(ContractContext);

  const factoryContract = contractState[0];
  const daiContract = contractState[1];

  const context = useWeb3React();
  const {
    account,
    active,
    activate,
    connector,
    deactivate,
    library,
    error,
  } = context;

  const [wallet, setWallet] = useState<any>(null);
  const [marketContractInstance, setMarketContractInstance] = useState<any>(
    null
  );
  const [marketEventName, setMarketEventName] = useState<string>(
    "Who will win the 2020 US General Election"
  );
  const [question, setQuestion] = useState<string>(
    'Who will win the 2020 US General Election␟"Donald Trump","Joe Biden"␟news-politics␟en_US'
  );

  const [numberOfOutcomes, setNumberOfOutcomes] = useState<number>(2);

  const getDai = () =>
    modalDispatch({
      type: "TOGGLE_TRADE_MODAL",
      payload: !modalState.tradeModalIsOpen,
    });

  const openEmailModal = () =>
    modalDispatch({
      type: "TOGGLE_EMAIL_MODAL",
      payload: !modalState.emailModalIsOpen,
    });

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(
      window.web3.currentProvider
    );
    const wallet = provider.getSigner();
    setWallet(wallet);

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
        // const Provider = new ethers.providers.Web3Provider(
        //   portis.portis.provider
        // );
        // const wallet = Provider.getSigner();
        const instance: any = new ethers.Contract(
          mostRecentlyDeployedAddress,
          BTMarketContract.abi,
          wallet
        );
        setMarketContractInstance(instance);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createMarket = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const MARKET_EVENT_NAME = marketEventName;
    const MARKET_OPENING_TIME = 0;
    const MARKET_RESOLUTION_TIME = 0;
    const ARBITRATOR = "0xd47f72a2d1d0E91b0Ec5e5f5d02B2dc26d00A14D";
    const QUESTION = question;
    const NUMBER_OF_OUTCOMES = numberOfOutcomes;

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

  return (
    <Container>
      <Content>
        <Top>
          <Title>Dashboard</Title>
          <SVG
            fill="#000000"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            onClick={() => openEmailModal()}
          >
            <path d="M 12 2 C 11.172 2 10.5 2.672 10.5 3.5 L 10.5 4.1953125 C 7.9131836 4.862095 6 7.2048001 6 10 L 6 15 L 18 15 L 18 10 C 18 7.2048001 16.086816 4.862095 13.5 4.1953125 L 13.5 3.5 C 13.5 2.672 12.828 2 12 2 z M 5 17 A 1.0001 1.0001 0 1 0 5 19 L 10.269531 19 A 2 2 0 0 0 10 20 A 2 2 0 0 0 12 22 A 2 2 0 0 0 14 20 A 2 2 0 0 0 13.728516 19 L 19 19 A 1.0001 1.0001 0 1 0 19 17 L 5 17 z" />
          </SVG>
        </Top>

        <Wrapper>
          {marketContractInstance && (
            <MarketCard
              daiContract={daiContract}
              marketContract={marketContractInstance}
            />
          )}

          <Form onSubmit={createMarket}>
            <Input
              type="text"
              value={marketEventName}
              onChange={(e: any) => setMarketEventName(e.target.value)}
            />
            <Input
              type="text"
              value={question}
              onChange={(e: any) => setQuestion(e.target.value)}
            />
            <Input
              type="text"
              value={numberOfOutcomes}
              onChange={(e: any) => setNumberOfOutcomes(e.target.value)}
            />
            <Button>Create Market</Button>
          </Form>

          <GetDaiButton onClick={() => getDai()}>
            <DaiIcon />
          </GetDaiButton>
        </Wrapper>
      </Content>
    </Container>
  );
};

export default Dashboard;
