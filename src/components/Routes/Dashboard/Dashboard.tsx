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
import { Dai } from "@rimble/icons";
import { Tooltip } from "rimble-ui";
import { DaiABI } from "contracts/DaiABI";

const Dashboard = () => {
  const { state, dispatch } = useContext(LayoutContext);
  const [instance, setInstance] = useState("");
  const [daiContractInstance, setDaiContractInstance] = useState("");
  const DaiAddressKovan = "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa";

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
    const contractAddress = "0xBECFc6F472798FD59020Eec49Df0F4799b4e0f2A";
    const instance: any = new ethers.Contract(
      contractAddress,
      BTMarketContract.abi,
      wallet
    );
    setInstance(instance);

    const DaiInstance: any = new ethers.Contract(
      DaiAddressKovan,
      DaiABI,
      wallet
    );
    setDaiContractInstance(DaiInstance);
  }, []);

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
          <Card
            key={1}
            daiContract={daiContractInstance}
            marketContract={instance}
          />
          {/* <Card
            key={1}
            marketContractName={Example.market}
            owner={Example.owner}
          /> */}

          <Button onClick={() => console.log("createmarket()")}>
            Create New Contract
          </Button>
          <GetDaiButton onClick={() => getDai()}>
            <i>
              <Dai />
            </i>
          </GetDaiButton>
        </Wrapper>
      </Content>
    </Container>
  );
};

export default Dashboard;
