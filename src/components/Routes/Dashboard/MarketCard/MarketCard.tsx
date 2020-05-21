import React, { useState, useEffect, useContext } from "react";
import CountUp from "react-countup";
import CountDown from "react-countdown";
import { v4 as uuidv4 } from "uuid";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

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
} from "./MarketCard.style";
import Chart from "./Chart";
import { ModalContext } from "store/context/ModalContext";
import { utils } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MarketCard = ({ marketContract, daiContract }: any) => {
  console.log("Market Contract: ", marketContract);
  const { modalState, modalDispatch } = useContext(ModalContext);
  const { account, library } = useWeb3React<Web3Provider>();

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
  }, [MarketStates, marketContract]);

  useEffect(() => {
    (async () => {
      let numberOfTokenContracts = await marketContract.tokenContractsCreated();

      if (numberOfTokenContracts.toNumber() !== 0) {
        let numberOfOutcomes = (
          await marketContract.numberOfOutcomes()
        ).toNumber();

        let newOutcomes = [];
        for (let i = 0; i < numberOfOutcomes; i++) {
          let outcomeName = await marketContract.outcomeNames(i);
          newOutcomes.unshift(outcomeName);
        }
        setOutcomes(newOutcomes);
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
  }, [account, daiContract, marketContract.address]);

  const openInfoModal = () =>
    modalDispatch({
      type: "TOGGLE_INFO_MODAL",
      payload: !modalState.infoModalIsOpen,
    });

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

    let formatted = utils.parseUnits(amountToBet.toString(), 18);

    try {
      let tx = await marketContract.placeBet(choiceAsNumber, formatted);
      notifyConfirmation(tx.hash);
      let result = await tx.wait();
      notifySuccess(result.transactionHash);
    } catch (error) {
      console.error(error);
      notifyFailure();
    }
  };

  const withdraw = async () => {
    try {
      let tx = await marketContract.withdraw();
      console.log(tx.hash);
      await tx.wait();
    } catch (error) {
      console.error(error);
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

  const notifyConfirmation = (txHash: any) => {
    toast(
      <a
        href={`https://kovan.etherscan.io/tx/${txHash}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {`Transaction Confirmed`}
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
    toast(<span>{`Transaction Failed. Try increasing the gas`}</span>, {
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
              <Info onClick={() => openInfoModal()} />
            </SVG>
          </Wrapper>
        </Header>
        <Prompt>{prompt}</Prompt>

        <GraphFormWrapper>
          <ChartWrapper>
            <Chart outcomes={outcomes} marketContract={marketContract} />
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
