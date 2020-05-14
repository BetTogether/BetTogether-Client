import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import CountDown from "react-countdown";
import { v4 as uuidv4 } from "uuid";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import { ShortenAddress } from "utils/ShortenAddress";
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
import Chart from "./Chart";

//!remove
import { ethers } from "ethers";
import { parseUnits } from "@ethersproject/units";

const Card = ({ marketContract, daiContract, numberOfTokenContracts }: any) => {
  console.log("numberOfTokenContracts:", numberOfTokenContracts);
  console.log(marketContract);
  const context = useWeb3React<Web3Provider>();
  const { active, account, library } = context;

  const [amountToBet, setAmountToBet] = useState<number>(0);
  const [accrued, setAccrued] = useState<number>(0);
  const [AAVEToken] = useState<number>(0);
  const [gross, setGross] = useState<number>(3);
  const [marketResolutionTime, setMarketResolutionTime] = useState<number>(0);
  const MarketStates = ["SETUP", "WAITING", "OPEN", "LOCKED", "WITHDRAW"];
  const [state, setState] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [owner, setOwner] = useState<string>("");
  const [choice, setChoice] = useState<string>("");
  const [outcomes, setOutcomes] = useState<any>([]);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [daiApproved, setDaiApproved] = useState<boolean>(false);
  const [daiAllowance, setDaiAllowance] = useState<string>("");
  const [totalNumberOfBets, setTotalNumberOfBets] = useState<number>(0);
  const [totalNumberOfParticipants, setTotalNumberOfParticipants] = useState<
    number
  >(0);

  //temp
  const [totalVotesTrump, setTotalVotesTrump] = useState<number>(0);
  const [totalVotesBiden, setTotalVotesBiden] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const state = await marketContract.state();
      console.log("state:", state);
      setState(MarketStates[state]);
      const owner = await marketContract.owner();
      setOwner(owner);
      const isPaused = await marketContract.paused();
      setIsPaused(isPaused);
      const marketResolutionTime = await marketContract.marketResolutionTime();
      setMarketResolutionTime(marketResolutionTime);
      const eventName = await marketContract.eventName();
      setPrompt(eventName);
      const totalBets = await marketContract.totalBets();
      setTotalNumberOfBets(totalBets.toNumber());

      if (numberOfTokenContracts !== 0) {
        const DT = await marketContract.outcomeNames(0);
        const JB = await marketContract.outcomeNames(1);

        const DTNumberOfBets = await marketContract.totalBetsPerOutcome(0);
        setTotalVotesTrump(DTNumberOfBets.toNumber());
        const JBNumberOfBets = await marketContract.totalBetsPerOutcome(1);
        setTotalVotesBiden(JBNumberOfBets.toNumber());

        setOutcomes([...outcomes, DT, JB]);
        // setOutcomes([
        //   ...outcomes,
        //   { name: DT, percentage: DTNumberOfBets / totalBets },
        //   { name: JB, percentage: JBNumberOfBets / totalBets },
        // ]);
      }
      // let numberOfOutcomes = (
      //   await marketContract.numberOfOutcomes()
      // ).toNumber();
      // for (let i = 0; i < numberOfOutcomes; i++) {
      //   let newOutcomeName = await marketContract.eventOutcomes(i);
      //   console.log("newOutcomeName:", newOutcomeName);
      //   setOutcomes([...outcomes, { name: newOutcomeName }]);
      // }
      // await marketContract.placeBet(1, 1);
    })();
  }, []);

  useEffect(() => {
    const getAllowance = async () => {
      return await daiContract.allowance(account, marketContract.address);
    };
    if (account) {
      getAllowance().then((allowance) => {
        if (allowance.toString() !== "0") {
          setDaiApproved(true);
          const stringRep = allowance.toString();
          const formatted = ethers.utils.formatEther(stringRep);
          setDaiAllowance(formatted);
        }
      });
    }
  }, [account]);

  // const enableDai = async (e: any) => {
  //   const val = e.target.checked;
  //   let balance = await daiContract.balanceOf(account);

  //   if (!val) balance = 0;

  //   await daiContract.approve(marketContract.address, balance.toString());
  // };

  const placeBet = async (e: any) => {
    e.preventDefault();
    console.log(choice);
    console.log(amountToBet);

    let choiceAsNumber: number;
    choice === "Donald Trump" ? (choiceAsNumber = 0) : (choiceAsNumber = 1);

    if (!daiApproved) {
      let balance = await daiContract.balanceOf(account);
      await daiContract.approve(marketContract.address, balance);
      setDaiApproved(true);
    }

    await marketContract.placeBet(1, amountToBet);
  };

  const checkOwner = () => {
    if (owner !== null && account !== null) {
      if (account === null) return false;
      return account === owner;
    } else {
      return false;
    }
  };

  //   /** OWNER FUNCTIONS */
  const incrementState = async () => {
    await marketContract.incrementState();
  };

  const disable = async () => {
    await marketContract.disableContract();
  };

  return (
    <Content>
      <Header>
        <span>{ShortenAddress(marketContract.address)}</span>
        <span>{state ? state : "-"}</span>
        <span>
          {marketResolutionTime ? (
            <CountDown date={Date.now() + marketResolutionTime} />
          ) : (
            "-"
          )}
        </span>
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
          <ItemDescription>Number of Paricipants</ItemDescription>
          <MarketAmount>{`${
            totalNumberOfParticipants ? setTotalNumberOfParticipants : "-"
          }`}</MarketAmount>
        </Item>
        <Item>
          <ItemDescription>Total Pot</ItemDescription>
          <MarketAmount>{`${
            totalNumberOfBets ? totalNumberOfBets : "-"
          }`}</MarketAmount>
        </Item>
        <Item>
          <ItemDescription>Compounded in AAVE</ItemDescription>
          <MarketAmount>{AAVEToken}</MarketAmount>
        </Item>
      </MarketDetails>

      <GraphFormWrapper>
        {/* <ChartWrapper>
          <Chart outcomes={outcomes} />
        </ChartWrapper> */}

        <Form onSubmit={placeBet}>
          <>
            <span>DAI {daiApproved ? "Enabled" : "Disabled"}</span>
            {/* <label>
              Dai approved?
              <input
                name="enable dai"
                type="checkbox"
                checked={daiApproved ? true : false}
                onChange={enableDai}
              />
            </label> */}

            <span>{daiAllowance} DAI</span>
          </>
          <Select
            value={choice}
            onChange={(e: any) => setChoice(e.target.value)}
          >
            <Option key={uuidv4()} value="" />
            {outcomes.map((outcome: any) => (
              <Option key={uuidv4()} value={outcome}>
                {outcome}
              </Option>
            ))}
          </Select>

          <Input
            type="number"
            placeholder="0"
            onChange={(e: any) => setAmountToBet(e.target.value)}
          />
          {!!(library && account) && (
            <Button disabled={amountToBet <= 0 || active === false}>
              Enter
            </Button>
          )}
        </Form>
      </GraphFormWrapper>

      <h1>Votes for Trump: {totalVotesTrump}</h1>
      <h1>Votes for Biden: {totalVotesBiden}</h1>

      {checkOwner() && (
        <OwnerButtons>
          <OwnerButton onClick={() => incrementState()}>
            Increment State
          </OwnerButton>
          <OwnerButton onClick={() => disable()}>Disable Contract</OwnerButton>
        </OwnerButtons>
      )}
    </Content>
  );
};

export default Card;
