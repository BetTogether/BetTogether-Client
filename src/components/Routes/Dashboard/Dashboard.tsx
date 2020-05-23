import React, { useState, useContext } from "react";
import { Dai as DaiIcon } from "@rimble/icons";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { NotificationsActive, NotificationsOff } from "@rimble/icons";
import Switch from "react-switch";

import Container from "components/Routes/RoutesContainer";
import { ModalContext } from "store/context/ModalContext";
import { ContractContext } from "store/context/ContractContext";
import {
  Content,
  Top,
  Title,
  Wrapper,
  GetDaiButton,
  CreateMarketButton,
  IconStyled,
} from "./Dashboard.style";
import MarketCard from "./MarketCard";

const Dashboard = () => {
  const { active } = useWeb3React<Web3Provider>();
  const { modalState, modalDispatch } = useContext(ModalContext);
  const { contractState } = useContext(ContractContext);
  const marketContractInstance = contractState[2];
  const [checked, setChecked] = useState(false);

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

  return (
    <Container>
      <Content>
        <Top>
          <Title>Dashboard</Title>
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
          {marketContractInstance ? (
            <MarketCard />
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
