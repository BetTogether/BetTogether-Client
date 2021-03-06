import React, { useState, useEffect, useContext } from "react";
import CountUp from "react-countup";
import CountDown from "react-countdown";
import { v4 as uuidv4 } from "uuid";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { utils, Contract, providers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { shortenAddress } from "utils/ShortenAddress";
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
  Balance,
  SelectInput,
  ToggleButton,
} from "./MarketCard.style";
import Chart from "./Chart";
import { ModalContext } from "store/context/ModalContext";
import { ContractContext } from "store/context/ContractContext";

const MarketCard = ({ marketContract }: any) => {
  //Web3React dependency to give us access to our current account and Web3Provider
  const { active, account, library } = useWeb3React<Web3Provider>();

  //Pulling out the current market and Dai contract from context state
  const { contractState } = useContext(ContractContext);
  const daiContract = contractState[1];
  const { modalState, modalDispatch } = useContext(ModalContext);

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
  const [forceRerender, setRerender] = useState<boolean>(false);
  const [etherBalance, setEtherBalance] = useState<any>();
  const [daiBalance, setDaiBalance] = useState<any>();
  const [usingDai, setUsingDai] = useState<boolean>(true);

  //!FOR EVENTS
  const [eventState, setEventState] = useState();
  const [eventBet, setEventBet] = useState();
  marketContract.on("StateChanged", (state: any) => setEventState(state));
  marketContract.on("ParticipantEntered", (address: any) =>
    setEventBet(address)
  );

  useEffect(() => {
    (async () => {
      if (account && library) {
        library
          .getBalance(account)
          .then((etherBalance: { toString: () => string }) => {
            let formattedEther = utils.formatUnits(etherBalance.toString(), 18);
            let formattedEtherBalance = parseFloat(formattedEther);
            setEtherBalance(formattedEtherBalance.toFixed(2));
          });

        let daiBalance = await daiContract.balanceOf(account);
        let formattedDai = utils.formatUnits(daiBalance, 18);
        setDaiBalance(formattedDai);
      }
    })();
  }, [account, daiContract, etherBalance, library]);

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
      const accIntFormatted = utils.formatEther(accruedInterest.toNumber());
      setAccruedInterest(parseFloat(accIntFormatted));
    })();
  }, [MarketStates, account, marketContract, eventState, eventBet]);

  //If there are outcomes, get them
  useEffect(() => {
    (async () => {
      let numberOfOutcomes = await marketContract.numberOfOutcomes();
      if (numberOfOutcomes.toNumber() !== 0) {
        let numberOfOutcomes = (
          await marketContract.numberOfOutcomes()
        ).toNumber();
        let newOutcomes = [];
        for (let i = 0; i < numberOfOutcomes; i++) {
          let outcomeName = await marketContract.outcomeNames(i);
          newOutcomes.push(outcomeName);
        }
        setOutcomes(newOutcomes);
      }
    })();
  }, [marketContract]);

  // Get the users current Dai allowance
  useEffect(() => {
    const getAllowance = async () => {
      return await daiContract.allowance(account, marketContract.address);
    };
    if (account) {
      getAllowance().then((allowance) => {
        if (allowance.toString() !== "0") setDaiApproved(true);
      });
    }
  }, [account, daiContract, marketContract.address]);

  //Place a bet
  const placeBet = async (e: any) => {
    e.preventDefault();
    if (marketState !== "OPEN") {
      console.log("marketState !== OPEN");
      return;
    }

    let amountToBetMultiplied = amountToBet * 1000000000000000000;

    let balance = await daiContract.balanceOf(account);

    if (balance < amountToBetMultiplied) {
      notifyInsufficientDai();
      return;
    }

    console.log(outcomes);
    console.log("choice:", choice);

    let indexOfChoice: number = outcomes.indexOf(choice);

    /* if (!daiApproved) {
      let balance = await daiContract.balanceOf(account);
      await daiContract.approve(marketContract.address, balance);
      setDaiApproved(true);
    } */

    let formatted = utils.parseUnits(amountToBet.toString(), 18);

    const increaseByFactor = (number: utils.BigNumber) =>
      number.mul(utils.bigNumberify(120)).div(utils.bigNumberify(100));

    const estimatedWei = await marketContract.getEstimatedETHforDAI(formatted);
    const estimatedWeiWithMargin = increaseByFactor(estimatedWei[0]);
    const estimatedGas = await marketContract.estimate.placeBet(
      indexOfChoice,
      formatted,
      { value: estimatedWeiWithMargin }
    );

    try {
      let tx = await marketContract.placeBet(indexOfChoice, formatted, {
        gasLimit: increaseByFactor(estimatedGas),
        value: estimatedWeiWithMargin,
      });
      notifyConfirmation(tx.hash);
      let result = await tx.wait();
      notifySuccess(result.transactionHash);
      setRerender(!forceRerender);
    } catch (error) {
      console.error(error);
      notifyFailure();
    }
  };

  //Withdraw functionality once the smart contract code is available
  const withdraw = async () => {
    try {
      let tx = await marketContract.withdraw();
      console.log(tx.hash);
      await tx.wait();
    } catch (error) {
      console.error(error);
    }
  };

  //Check if current address is the owner
  const checkOwner = () => {
    if (owner !== null && account !== null) {
      if (account === null) return false;
      return account === owner;
    } else {
      return false;
    }
  };

  //Toast notification popups
  const notifyConfirmation = (txHash: any) => {
    toast(
      <a
        href={`https://kovan.etherscan.io/tx/${txHash}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {`Transaction Sent`}
      </a>,
      {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        progressStyle: { background: "#0000ff" },
      }
    );
  };
  const notifySuccess = (txHash: any) => {
    toast(
      <a
        href={`https://kovan.etherscan.io/tx/${txHash}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {`Transaction Success`}
      </a>,
      {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        progressStyle: { background: "#00ff00" },
      }
    );
  };
  const notifyFailure = () => {
    toast(<span>{`Transaction Failed. Increase the gas if needed.`}</span>, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      progressStyle: { background: "#ff0000" },
    });
  };
  const notifyInsufficientDai = () => {
    toast(<span>{`You have insufficient Dai`}</span>, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      progressStyle: { background: "#ff0000" },
    });
  };

  return !prompt ? null : (
    <>
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
              <Info
                onClick={() =>
                  modalDispatch({
                    type: "TOGGLE_INFO_MODAL",
                    payload: !modalState.infoModalIsOpen,
                  })
                }
              />
            </SVG>
          </Wrapper>
        </Header>
        <Prompt>{prompt}</Prompt>

        <GraphFormWrapper>
          <ChartWrapper>
            <Chart
              marketContract={marketContract}
              forceRerender={forceRerender}
            />
          </ChartWrapper>
          {active && (
            <Form onSubmit={placeBet}>
              <Select
                value={choice}
                onChange={(e: any) => setChoice(e.target.value)}
              >
                <Option disabled value="" />
                {outcomes.map((outcome: any) => (
                  <Option key={uuidv4()} value={outcome}>
                    {outcome}
                  </Option>
                ))}
              </Select>
              <ToggleButton
                type="button"
                onClick={() => setUsingDai(!usingDai)}
              >
                {usingDai ? "Dai" : "Ether"}
              </ToggleButton>
              <SelectInput>
                {usingDai ? (
                  <Balance>{daiBalance ? daiBalance : "-"}</Balance>
                ) : (
                  <Balance>{etherBalance ? etherBalance : "-"}</Balance>
                )}
                <Input
                  type="number"
                  placeholder="0"
                  onChange={(e: any) => setAmountToBet(e.target.value)}
                  onKeyDown={(e: any) =>
                    (e.key === "e" && e.preventDefault()) ||
                    (e.key === "+" && e.preventDefault()) ||
                    (e.key === "-" && e.preventDefault())
                  }
                />
              </SelectInput>

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
          )}
        </GraphFormWrapper>

        {checkOwner() && (
          <OwnerButtons>
            <OwnerButton
              onClick={async () => await marketContract.incrementState()}
            >
              Increment Market State
            </OwnerButton>
            <OwnerButton
              onClick={async () => await marketContract.determineWinner()}
            >
              Determine Winner
            </OwnerButton>
            <OwnerButton
              onClick={async () => await marketContract.disableContract()}
            >
              Pause (Disable) Contract
            </OwnerButton>
          </OwnerButtons>
        )}
      </Content>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default MarketCard;
