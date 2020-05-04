import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import {
  Content,
  Header,
  ID,
  Question,
  MarketContent,
  Section,
  Item,
  MarketAmount,
  ItemDescription,
  Form,
  Input,
  BuyTicket,
  DaiLabel,
  DaiChildLabel,
  DaiInput,
  OwnerButton,
  OwnerButtons,
} from "./Card.style";

const Card = ({ marketContractName, owner }: any) => {
  const [usingDai, setUsingDai] = useState(true);
  const [marketsDaiBalance, setMarketsDaiBalance] = useState(0);
  const [amountToSave, setAmountToSave] = useState(0);
  const [approve, setApprove] = useState(false);
  const [accrued, setAccrued] = useState(0);
  const [AAVEToken, setAAVEToken] = useState(0);
  const [gross, setGross] = useState(3);
  const [state, setState] = useState(null);
  const LotteryStates = ["OPEN", "COMMITTING", "REWARDING"];
  const [winnings, setWinnings] = useState(null);
  const [accountBalance, setAccountBalance] = useState(null);
  const activeAccount = "0x1d9999be880e7e516dEefdA00a3919BdDE9C1707";

  const handleDaiEnable = async (e: any) => {
    // await daiContract.methods
    //   .approve(marketPotContract.address, balance)
    //   .send({
    //     from: activeAccount,
    //   });
  };

  const submitFunds = async (e: any) => {
    e.preventDefault();
  };

  const checkOwner = () => {
    if (owner !== null && activeAccount !== null) {
      if (activeAccount === null) return false;
      return activeAccount === owner;
    } else {
      return false;
    }
  };

  //   /** OWNER FUNCTIONS */
  const incrementState = async () => {
    console.log("incrementState:");

    // await contract.methods.incrementState().send({
    //   from: activeAccount,
    // });
  };

  const disable = async () => {
    console.log("disable:");
    // await methods
    //   .disableContract()
    //   .send({
    //     from: activeAccount,
    //   });
  };

  useEffect(() => {
    // const getAllowance = async () => {
    // };
    // if (activeAccount) {
    //   getAllowance().then((allowance) => {
    //     if (allowance !== "0") setApprove(true);
    //   });
    // }
  }, []);

  return (
    <Content>
      <Header>
        <ID>{marketContractName}</ID>
        <span>{"Open"}</span>
        <span>{"10:23:22"}</span>
      </Header>
      <Question>Bitcoin's Price on June 1st, 2020</Question>
      <MarketContent>
        <Section>
          <Item>
            <MarketAmount>
              {`${marketsDaiBalance ? marketsDaiBalance : "0"}`} Dai
            </MarketAmount>
            <ItemDescription>Compounding Pot</ItemDescription>
          </Item>
          <Item>
            <MarketAmount>{AAVEToken} Dai</MarketAmount>
            <ItemDescription>In AAVE</ItemDescription>
          </Item>
          <Item>
            <MarketAmount>{`${
              marketsDaiBalance && accountBalance
                ? (accountBalance! / marketsDaiBalance) * 100
                : "-"
            }`}</MarketAmount>
            <ItemDescription>Chances (%)</ItemDescription>
          </Item>
        </Section>
        <Section>
          <Item>
            <MarketAmount>
              <CountUp
                start={0}
                end={gross}
                decimals={8}
                preserveValue={true}
              />{" "}
              Dai
            </MarketAmount>
            <ItemDescription>Potential Winnings</ItemDescription>
          </Item>
          <Item>
            <MarketAmount>{accountBalance} Dai</MarketAmount>
            <ItemDescription>Your Balance</ItemDescription>
          </Item>
          <Item>
            <>
              <DaiInput type="checkbox" id="check" onChange={handleDaiEnable} />
              <DaiLabel htmlFor="check" isChecked={approve}>
                <DaiChildLabel isChecked={approve} />
              </DaiLabel>
            </>
            <ItemDescription>Toggle Dai</ItemDescription>
          </Item>
        </Section>

        <Form onSubmit={submitFunds}>
          <Input
            type="number"
            value={amountToSave}
            onChange={(e: any) => setAmountToSave(e.target.value)}
          />
          <BuyTicket disabled={amountToSave <= 0}>Save</BuyTicket>
        </Form>

        {checkOwner() && (
          <OwnerButtons>
            <OwnerButton onClick={() => incrementState()}>
              Increment State
            </OwnerButton>
            <OwnerButton onClick={() => disable()}>
              Disable Contract
            </OwnerButton>
          </OwnerButtons>
        )}
      </MarketContent>
    </Content>
  );
};

export default Card;
