import React, { useState, useContext, useEffect } from "react";
import { Dai as DaiIcon } from "@rimble/icons";
import { providers, Contract } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { NotificationsActive, NotificationsOff } from "@rimble/icons";
import Switch from "react-switch";

import BTMarketContract from "abis/BTMarket.json";
import { injected, portis } from "utils/connectors";
import Container from "components/Routes/RoutesContainer";
import { ModalContext } from "store/context/ModalContext";
import { ContractContext } from "store/context/ContractContext";
import {
  Content,
  Top,
  Title,
  Wrapper,
  Button,
  GetDaiButton,
  CreateMarketButton,
  Input,
  Checkbox,
  CheckBoxLabel,
} from "./Dashboard.style";
import MarketCard from "./MarketCard";
import styled from "styled-components";

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
  const [checked, setChecked] = useState(false);

  const IconStyled = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: center;
  `;

  const IconOn = () => {
    return (
      <IconStyled>
        <NotificationsActive size={15} color="white" />
      </IconStyled>
    );
  };

  const IconOff = () => {
    return (
      <IconStyled>
        <NotificationsOff size={15} color="white" />
      </IconStyled>
    );
  };

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

          {/* <Input
              id="checkbox"
              type="checkbox"
              // checked={toggleSwitch}
              // onChange={() => setToggleSwitch(!toggleSwitch)}
            /> */}
          <Switch
            onColor="#f1404b"
            offColor="#dddfe6"
            width={40}
            height={20}
            checkedIcon={<IconOn />}
            uncheckedIcon={<IconOff />}
            onChange={() => setChecked(!checked)}
            checked={checked}
            className="react-switch"
          />
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
