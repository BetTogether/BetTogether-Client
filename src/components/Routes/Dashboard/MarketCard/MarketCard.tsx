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
} from "./MarketCard.style";
import Chart from "./Chart";

//!remove
import { ethers, utils } from "ethers";
import { parseUnits } from "@ethersproject/units";

const MarketCard = ({ marketContract, daiContract }: any) => {
  console.log(marketContract);
  const context = useWeb3React<Web3Provider>();
  const { account, library } = context;

  const [amountToBet, setAmountToBet] = useState<number>(0);
  const [accruedInterest, setAccruedInterest] = useState<number>(0);
  const [marketResolutionTime, setMarketResolutionTime] = useState<number>(0);
  const MarketStates = ["SETUP", "WAITING", "OPEN", "LOCKED", "WITHDRAW"];
  const [state, setState] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [owner, setOwner] = useState<string>("");
  const [choice, setChoice] = useState<string>("");
  const [outcomes, setOutcomes] = useState<any>([]);
  const [daiApproved, setDaiApproved] = useState<boolean>(false);
  const [daiAllowance, setDaiAllowance] = useState<string>("");
  const [numberOfParticipants, setNumberOfParticipants] = useState<number>(0);
  const [pot, setPot] = useState<string>("");

  //temp
  const [totalVotesForTrump, setTotalVotesForTrump] = useState<string>("");
  const [totalVotesForBiden, setTotalVotesForBiden] = useState<string>("");

  useEffect(() => {
    (async () => {
      const state = await marketContract.state();
      setState(MarketStates[state]);
      const owner = await marketContract.owner();
      setOwner(owner);
      const marketResolutionTime = await marketContract.marketResolutionTime();
      setMarketResolutionTime(marketResolutionTime);
      const eventName = await marketContract.eventName();
      setPrompt(eventName);
      const numberOfParticipants = await marketContract.getMarketSize();
      setNumberOfParticipants(numberOfParticipants.toNumber());
      const pot = await marketContract.totalBets();
      const unformatted = pot.toString();
      setPot(utils.formatUnits(unformatted, 18));
      const accruedInterest = await marketContract.getTotalInterest();
      const formatted = utils.formatEther(accruedInterest.toNumber());
      setAccruedInterest(parseFloat(formatted));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let numberOfTokenContracts = await marketContract.tokenContractsCreated();

      if (numberOfTokenContracts.toNumber() === 0) {
        await marketContract.createTokenContract("Trump", "Trump");
        await marketContract.createTokenContract("Biden", "Biden");
      }

      if (numberOfTokenContracts.toNumber() !== 0) {
        const DT = await marketContract.outcomeNames(0);
        const DTNumberOfBets = await marketContract.totalBetsPerOutcome(0);
        console.log("DTNumberOfBets:", DTNumberOfBets);

        const fortmattedTrump = utils.formatUnits(DTNumberOfBets, 18);
        let cielstring = parseFloat(fortmattedTrump);
        let ceil = Math.ceil(cielstring);
        setTotalVotesForTrump(ceil + "");

        const JB = await marketContract.outcomeNames(1);
        const JBNumberOfBets = await marketContract.totalBetsPerOutcome(1);
        setTotalVotesForBiden(JBNumberOfBets.toString());

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
    })();
  }, []);

  useEffect(() => {
    const getAllowance = async () => {
      return await daiContract.allowance(account, marketContract.address);
    };
    if (account) {
      getAllowance().then((allowance) => {
        console.log("allowance:", allowance);
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
    //TESTING
    if (state !== "OPEN") {
      console.log("state !== OPEN");
      return;
    }

    let choiceAsNumber: number;
    choice === "Trump" ? (choiceAsNumber = 0) : (choiceAsNumber = 1);

    if (!daiApproved) {
      let balance = await daiContract.balanceOf(account);
      await daiContract.approve(marketContract.address, balance);
      setDaiApproved(true);
    }

    let stringed = amountToBet + "";
    let factored = ethers.utils.parseUnits(stringed, 18);

    console.log(choiceAsNumber, factored);
    console.log("Formatted", choiceAsNumber.toString(), factored.toString());

    try {
      let tx = await marketContract.placeBet(choiceAsNumber, factored);
      console.log(tx.hash);
      await tx.wait();
    } catch (error) {
      throw error;
    }
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

  const enableDai = async (e: any) => {
    const val = e.target.checked;
    let balance = await daiContract.balanceOf(account);

    if (!val) balance = 0;

    await daiContract.approve(marketContract.address, balance.toString());
  };

  return (
    <Content>
      <Header>
        <span>{ShortenAddress(marketContract.address)}</span>
        <span>
          <ItemDescription>
            Current, Potential Winnings (in Dai)
          </ItemDescription>
          <CountUp
            start={0}
            end={accruedInterest}
            decimals={18}
            preserveValue={true}
            duration={5}
          />
        </span>

        <span>
          {marketResolutionTime ? (
            <CountDown date={Date.now() + marketResolutionTime} />
          ) : (
            "-"
          )}
        </span>
      </Header>
      <Prompt>{prompt}</Prompt>

      {/* <MarketDetails>
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
      </MarketDetails> */}

      <GraphFormWrapper>
        <ChartWrapper>
          <Chart outcomes={outcomes} />
        </ChartWrapper>

        <Form onSubmit={placeBet}>
          <>
            <span>DAI {daiApproved ? "Enabled" : "Disabled"}</span>
            <label>
              Dai approved?
              <input
                name="enable dai"
                type="checkbox"
                checked={daiApproved ? true : false}
                onChange={enableDai}
              />
            </label>
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
            <Button disabled={amountToBet <= 0}>Enter</Button>
          )}
        </Form>
      </GraphFormWrapper>

      <h1>Votes for Trump: {totalVotesForTrump}</h1>
      <h1>Votes for Biden: {totalVotesForBiden}</h1>
      <h1>Number of Paritcipants: {numberOfParticipants}</h1>
      <h1>Total Pot Size: {pot}</h1>
      <h1>Owner: {ShortenAddress(owner)}</h1>
      <h1>State: {state}</h1>

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

export default MarketCard;
