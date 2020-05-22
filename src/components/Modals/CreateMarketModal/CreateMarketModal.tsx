import React, { useState, useEffect, useContext } from "react";

import { ModalContext } from "store/context/ModalContext";
import { Clear } from "@rimble/icons";
import { providers, utils, Contract } from "ethers";
import BTMarketContract from "abis/BTMarket.json";
import { useEscapeKey } from "utils/hooks";

import Spinner from "utils/spinner";
import {
  Wrapper,
  Modal,
  Top,
  Title,
  IconButton,
  Section,
  Input,
  Label,
  Form,
  Button,
  InputWrapper,
} from "./CreateMarketModal.style";
import { ContractContext } from "store/context/ContractContext";

interface ICreateMarketModalProps {
  isOpen: boolean;
}

const CreateMarketModal = ({ isOpen }: ICreateMarketModalProps) => {
  const { modalState, modalDispatch } = useContext(ModalContext);
  const { contractState } = useContext(ContractContext);
  const factoryContract = contractState[0];

  const [loading, setLoading] = useState<boolean>(false);
  const [marketEventName, setMarketEventName] = useState<string>(
    "Who will win the 2020 US General Election?"
  );
  const [marketOpeningTime, setMarketOpeningTime] = useState<number>(0);
  const [marketLockingTime, setMarketLockingTime] = useState<number>(0);
  const [marketResolutionTime, setMarketResolutionTime] = useState<any>(0);
  const [timeout, setTimeout] = useState<number>(40);
  const [arbitrator, setArbitrator] = useState<string>(
    "0xd47f72a2d1d0E91b0Ec5e5f5d02B2dc26d00A14D"
  );
  const [realitioQuestion, setRealitioQuestion] = useState<string>(
    'Who will win the 2020 US General Election␟"Donald Trump","Joe Biden"␟news-politics␟en_US'
  );
  //const [outcomes, setOutcomes] = useState<any>([]);
  const [testOutcomes, setTestOutcomes] = useState(["Trump", "Biden"]);

  const createMarket = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    const MARKET_EVENT_NAME = marketEventName;
    const MARKET_OPENING_TIME = marketOpeningTime;
    const MARKET_LOCKING_TIME = marketLockingTime;
    const MARKET_RESOLUTION_TIME = marketResolutionTime;
    const TIMEOUT = timeout;
    const ARBITRATOR = arbitrator;
    const REALITIO_QUESTION = realitioQuestion;
    const OUTCOMES = testOutcomes;

    let tx = await factoryContract.createMarket(
      MARKET_EVENT_NAME,
      MARKET_OPENING_TIME,
      MARKET_LOCKING_TIME,
      MARKET_RESOLUTION_TIME,
      TIMEOUT,
      ARBITRATOR,
      REALITIO_QUESTION,
      OUTCOMES
    );
    await tx.wait();

    //!Now create the tokens
    // const provider = new providers.Web3Provider(
    //   (window as any).web3.currentProvider
    // );
    // const wallet = provider.getSigner();
    // let deployedMarkets = await factoryContract.getMarkets();
    // let mostRecentlyDeployedAddress =
    //   deployedMarkets[deployedMarkets.length - 1];

    // let marketContract = new Contract(
    //   mostRecentlyDeployedAddress,
    //   BTMarketContract.abi,
    //   wallet
    // );

    // outcomes.forEach(
    //   async (outcome) =>
    //     await marketContract.createTokenContract(outcome.name, outcome.token)
    // );
    setLoading(false);
    toggleModal();
  };

  const toggleModal = () =>
    modalDispatch({
      type: "TOGGLE_CREATE_MARKET_MODAL",
      payload: !modalState.createMarketModalIsOpen,
    });

  // Escape key hook
  //useEscapeKey(toggleModal);

  const [outcomes, setOutcomes] = useState([
    { id: 1, name: "Donald Trump", token: "Trump" },
    { id: 2, name: "Joe Biden", token: "Biden" },
  ]);
  const [newOutcome, setNewOutcome] = useState({ name: "", token: "" });

  const submitOutcome = () => {
    if (!newOutcome.name || !newOutcome.token) return;
    const newId = outcomes.length + 1;
    let freshOutcome = {
      id: newId,
      name: newOutcome.name,
      token: newOutcome.token,
    };
    setOutcomes([...outcomes, freshOutcome]);
  };

  const deleteOutcome = ({ id }: any) =>
    setOutcomes(outcomes.filter((outcome) => outcome.id !== id));

  return (
    <Wrapper isOpen={isOpen}>
      <Modal>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Top>
              <Title>Create a new market</Title>
              <IconButton onClick={() => toggleModal()}>
                <Clear />
              </IconButton>
            </Top>
            <Form onSubmit={createMarket}>
              <Section>
                <InputWrapper>
                  <Label htmlFor="marketEventName">Market Event Name</Label>
                  <Input
                    type="text"
                    id="marketEventName"
                    value={marketEventName}
                    onChange={(e: any) => setMarketEventName(e.target.value)}
                  />
                </InputWrapper>
              </Section>
              <Section>
                <InputWrapper>
                  <Label htmlFor="realitioQuestion">Realit.io Question</Label>
                  <Input
                    type="text"
                    id="realitioQuestion"
                    value={realitioQuestion}
                    onChange={(e: any) => setRealitioQuestion(e.target.value)}
                  />
                </InputWrapper>
              </Section>
              <Section>
                <InputWrapper>
                  <Label htmlFor="arbitrator">Arbitrator</Label>
                  <Input
                    type="text"
                    id="arbitrator"
                    value={arbitrator}
                    onChange={(e: any) => setArbitrator(e.target.value)}
                  />
                </InputWrapper>
              </Section>
              <Section>
                <InputWrapper>
                  <Label htmlFor="marketOpeningTime">Opening</Label>
                  <Input
                    type="number"
                    id="marketOpeningTime"
                    value={marketOpeningTime}
                    onChange={(e: any) => setMarketOpeningTime(e.target.value)}
                  />
                </InputWrapper>
                <InputWrapper>
                  <Label htmlFor="marketLockingTime">Locking</Label>
                  <Input
                    type="number"
                    id="marketLockingTime"
                    value={marketLockingTime}
                    onChange={(e: any) => setMarketLockingTime(e.target.value)}
                  />
                </InputWrapper>
                <InputWrapper>
                  <Label htmlFor="marketResolutionTime">Resolution</Label>
                  <Input
                    type="number"
                    id="marketResolutionTime"
                    value={marketResolutionTime}
                    onChange={(e: any) =>
                      setMarketResolutionTime(e.target.value)
                    }
                  />
                </InputWrapper>
                <InputWrapper>
                  <Label htmlFor="timeout">Timeout</Label>
                  <Input
                    type="number"
                    id="timeout"
                    value={timeout}
                    onChange={(e: any) => setTimeout(e.target.value)}
                  />
                </InputWrapper>
              </Section>
              <Section>
                <InputWrapper>
                  <Label>Outcomes</Label>
                  <Input
                    type="text"
                    placeholder="Name"
                    value={newOutcome.name}
                    onChange={(e: any) =>
                      setNewOutcome({ ...newOutcome, name: e.target.value })
                    }
                  />
                  <Input
                    type="text"
                    placeholder="Token"
                    value={newOutcome.token}
                    onChange={(e: any) =>
                      setNewOutcome({ ...newOutcome, token: e.target.value })
                    }
                  />
                </InputWrapper>
                <IconButton type="button" onClick={() => submitOutcome()}>
                  +
                </IconButton>
              </Section>
              <Section>
                {outcomes.length > 0 ? (
                  <table>
                    <tbody>
                      {outcomes.map((outcome) => (
                        <tr key={outcome.id}>
                          <td>{outcome.name}</td>
                          <td>{outcome.token}</td>
                          <td>
                            <IconButton
                              type="button"
                              onClick={() => deleteOutcome(outcome)}
                            >
                              <Clear />
                            </IconButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>Please add at least two options</p>
                )}
              </Section>

              <Button>Create Market</Button>
            </Form>
          </>
        )}
      </Modal>
    </Wrapper>
  );
};

export default CreateMarketModal;
