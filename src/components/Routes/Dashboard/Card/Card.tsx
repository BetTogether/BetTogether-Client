import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import {
  Content,
  Header,
  Prompt,
  GraphFormWrapper,
  ChartWrapper,
  MarketDetails,
  Item,
  MarketAmount,
  Form,
  ItemDescription,
  Option,
  Select,
  Button,
  Input,
  OwnerButton,
  OwnerButtons,
} from "./Card.style";
import { v4 as uuidv4 } from "uuid";
import Chart from "./Chart";
import { ShortenAddress } from "utils/ShortenAddress";

const Card = ({ marketContract, daiContract }: any) => {
  console.log("marketContract:", marketContract);
  // const [usingDai, setUsingDai] = useState(true);
  const [marketsDaiBalance] = useState(0);
  const [amountToBet, setAmountToBet] = useState(0);
  const [approve, setApprove] = useState(false);
  // const [accrued, setAccrued] = useState(0);
  const [AAVEToken] = useState(0);
  const [gross] = useState(3);
  const [state, setState] = useState("");
  const MarketStates = ["OPEN", "COMMITTING", "REWARDING"];
  const [accountBalance] = useState(0);
  const activeAccount = "0x1d9999be880e7e516dEefdA00a3919BdDE9C1707";
  const [prompt, setPrompt] = useState("");
  const [owner, setOwner] = useState("");
  const [choice, setChoice] = useState("");
  const [outcomes, setOutcomes] = useState<any>([]);

  useEffect(() => {
    (async () => {
      if (marketContract) {
        let state = await marketContract.state();
        setState(MarketStates[state]);
        let prompt = await marketContract.eventName();
        setPrompt(prompt);
        const owner = await marketContract.owner();
        setOwner(owner);

        // const totalBets = marketContract.totalBet()
        const totalBets = 100;

        const DT = await marketContract.eventOutcomes(0);
        // const DTNumberOfBets = await marketContract.totalBetPerOutcome(0);
        const DTNumberOfBets = 60;

        const JB = await marketContract.eventOutcomes(1);
        // const JBNumberOfBets = await marketContract.totalBetPerOutcome(1);
        const JBNumberOfBets = 40;

        setOutcomes([
          ...outcomes,
          { name: DT, percentage: DTNumberOfBets / totalBets },
          { name: JB, percentage: JBNumberOfBets / totalBets },
        ]);

        // let numberOfOutcomes = (
        //   await marketContract.numberOfOutcomes()
        // ).toNumber();
        // for (let i = 0; i < numberOfOutcomes; i++) {
        //   let newOutcomeName = await marketContract.eventOutcomes(i);
        //   console.log("newOutcomeName:", newOutcomeName);
        //   setOutcomes([...outcomes, { name: newOutcomeName }]);
        // }
      }
    })();
    /* eslint-disable */
  }, []);

  const enableDai = async () => {
    let balance = await daiContract.balanceOf(activeAccount);
    await daiContract.approve(marketContract.address, balance);
  };

  const submitFunds = async (e: any) => {
    e.preventDefault();

    if (!approve) {
      await enableDai();
      setApprove(true);
      console.log(choice);
      console.log(amountToBet);
    } else {
      console.log(choice);
      console.log(amountToBet);
    }
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
        <span>{ShortenAddress(marketContract.address)}</span>
        <span>{state ? state : "Nil"}</span>
        <span>{"10:23:22"}</span>
      </Header>
      <Prompt>{prompt}</Prompt>

      <MarketDetails>
        <Item>
          <ItemDescription>Potential Winnings (in Dai)</ItemDescription>
          <MarketAmount>
            <CountUp
              start={0}
              end={gross}
              decimals={2}
              preserveValue={true}
              duration={5}
            />
          </MarketAmount>
        </Item>
        <Item>
          <ItemDescription>Your Balance</ItemDescription>
          <MarketAmount>{accountBalance}</MarketAmount>
        </Item>
        <Item>
          <ItemDescription>Compounding Pot</ItemDescription>
          <MarketAmount>
            {`${marketsDaiBalance ? marketsDaiBalance : "0"}`}
          </MarketAmount>
        </Item>
        <Item>
          <ItemDescription>In AAVE</ItemDescription>
          <MarketAmount>{AAVEToken}</MarketAmount>
        </Item>
      </MarketDetails>

      <GraphFormWrapper>
        <ChartWrapper>
          <Chart outcomes={outcomes} />
        </ChartWrapper>

        <Form onSubmit={submitFunds}>
          <Select
            value={choice}
            onChange={(e: any) => setChoice(e.target.value)}
          >
            {outcomes.map((outcome: any) => (
              <Option key={uuidv4()} value={outcome.name}>
                {outcome.name} - {outcome.percentage * 100}%
              </Option>
            ))}
          </Select>

          <Input
            type="number"
            placeholder="0"
            onChange={(e: any) => setAmountToBet(e.target.value)}
          />
          <Button disabled={amountToBet <= 0}>Enter</Button>
        </Form>
      </GraphFormWrapper>

      {checkOwner() && (
        <>
          <h1>TEST BUTTONS...</h1>
          <OwnerButtons>
            <OwnerButton onClick={() => incrementState()}>
              Increment State
            </OwnerButton>
            <OwnerButton onClick={() => disable()}>
              Disable Contract
            </OwnerButton>
          </OwnerButtons>
        </>
      )}
    </Content>
  );
};

export default Card;
