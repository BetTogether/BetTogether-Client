import React, { useState, useEffect, useContext } from "react";
import CountUp from "react-countup";
import CountDown from "react-countdown";
import { v4 as uuidv4 } from "uuid";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import { shortenAddress } from "utils/shortenAddress";
import { ReactComponent as Info } from "assets/info.svg";
import {
  Content,
  Header,
  Wrapper,
  SVG,
  Prompt,
  GraphFormWrapper,
  ChartWrapper,
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
import { LayoutContext } from "store/Context";
import { ethers, utils } from "ethers";

const MarketCard = ({ marketContract, daiContract }: any) => {
  const { state, dispatch } = useContext(LayoutContext);
  console.log(marketContract);
  const context = useWeb3React<Web3Provider>();
  const { account, library } = context;

  const [amountToBet, setAmountToBet] = useState<number>(0);
  const [accruedInterest, setAccruedInterest] = useState<number>(0);
  const [marketResolutionTime, setMarketResolutionTime] = useState<number>(0);
  const MarketStates = ["SETUP", "WAITING", "OPEN", "LOCKED", "WITHDRAW"];
  const [marketState, setMarketState] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [owner, setOwner] = useState<string>("");
  const [choice, setChoice] = useState<string>("");
  const [outcomes, setOutcomes] = useState<any>([]);
  const [daiApproved, setDaiApproved] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const marketState = await marketContract.state();
      setMarketState(MarketStates[marketState]);
      const owner = await marketContract.owner();
      setOwner(owner);
      const marketResolutionTime = await marketContract.marketResolutionTime();
      setMarketResolutionTime(marketResolutionTime);
      const eventName = await marketContract.eventName();
      setPrompt(eventName);
      const accruedInterest = await marketContract.getTotalInterest();
      const formatted = utils.formatEther(accruedInterest.toNumber());
      setAccruedInterest(parseFloat(formatted));
    })();
    //eslint-disable-next-line
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
        const JB = await marketContract.outcomeNames(1);
        setOutcomes([...outcomes, DT, JB]);
        // let numberOfOutcomes = (
        //   await marketContract.numberOfOutcomes()
        // ).toNumber();
        // for (let i = 0; i < numberOfOutcomes; i++) {
        //   let newOutcomeName = await marketContract.eventOutcomes(i);
        //   console.log("newOutcomeName:", newOutcomeName);
        //   setOutcomes([...outcomes, newOutcomeName]);
        // }
      }
    })();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const getAllowance = async () => {
      return await daiContract.allowance(account, marketContract.address);
    };
    if (account) {
      getAllowance().then((allowance) => {
        if (allowance.toString() !== "0") setDaiApproved(true);
      });
    }
    //eslint-disable-next-line
  }, [account, marketContract.address]);

  const openInfoModal = () =>
    dispatch({ type: "TOGGLE_INFO_MODAL", payload: !state.infoModalIsOpen });

  const placeBet = async (e: any) => {
    e.preventDefault();
    //TESTING
    if (marketState !== "OPEN") {
      console.log("marketState !== OPEN");
      return;
    }

    let choiceAsNumber: number;
    choice === "Trump" ? (choiceAsNumber = 0) : (choiceAsNumber = 1);

    if (!daiApproved) {
      let balance = await daiContract.balanceOf(account);
      await daiContract.approve(marketContract.address, balance);
      setDaiApproved(true);
    }

    let formatted = ethers.utils.parseUnits(amountToBet.toString(), 18);

    try {
      let tx = await marketContract.placeBet(choiceAsNumber, formatted);
      console.log(tx.hash);
      await tx.wait();
    } catch (error) {
      throw error;
    }
  };

  const withdraw = async () => {
    try {
      let tx = await marketContract.withdraw();
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
  const incrementMarketState = async () => {
    await marketContract.incrementState();
  };

  const disable = async () => {
    await marketContract.disableContract();
  };

  const determineWinner = async () => {
    await marketContract.disableContract();
  };

  return (
    <Content>
      <Header>
        <span>{shortenAddress(marketContract.address)}</span>
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
        <Wrapper>
          <span>
            {marketResolutionTime ? (
              <CountDown date={Date.now() + marketResolutionTime} />
            ) : (
              "-"
            )}
          </span>
          <SVG>
            <Info onClick={() => openInfoModal()} />
          </SVG>
        </Wrapper>
      </Header>
      <Prompt>{prompt}</Prompt>

      <GraphFormWrapper>
        <ChartWrapper>
          <Chart outcomes={outcomes} />
        </ChartWrapper>

        <Form onSubmit={placeBet}>
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
            <>
              <Button buy disabled={amountToBet <= 0}>
                Enter
              </Button>
              {marketState === "WITHDRAW" && (
                <Button type="button" onClick={() => withdraw()}>
                  Withdraw
                </Button>
              )}
            </>
          )}
        </Form>
      </GraphFormWrapper>

      {checkOwner() && (
        <OwnerButtons>
          <OwnerButton onClick={() => incrementMarketState()}>
            Increment Market State
          </OwnerButton>
          <OwnerButton onClick={() => determineWinner()}>
            Determine Winner
          </OwnerButton>
          <OwnerButton onClick={() => disable()}>Disable Contract</OwnerButton>
        </OwnerButtons>
      )}
    </Content>
  );
};

export default MarketCard;
