import React, { useContext } from "react";
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
import { Dai } from "@rimble/icons";
import { Tooltip } from "rimble-ui";

const Dashboard = () => {
  const { state, dispatch } = useContext(LayoutContext);

  const getDai = () =>
    dispatch({ type: "TOGGLE_TRADE_MODAL", payload: !state.tradeModalIsOpen });

  //   let MarketList = Object.keys(contracts)
  //     .filter((contractName) => contractName !== "MarketFactory")
  //     .reverse();

  const Example = {
    market: "market 02314", //the last 5 digits of the contract address, acting as an ID
    owner: "0x1d9999be880e7e516dEefdA00a3919BdDE9C1707",
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
          <Card marketContractName={Example.market} owner={Example.owner} />

          <Button onClick={() => console.log("createPot()")}>
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
