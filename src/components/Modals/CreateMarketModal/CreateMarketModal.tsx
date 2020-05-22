/* eslint-disable */
import React, { useState, useContext } from "react";

import { ModalContext } from "store/context/ModalContext";
import { Clear } from "@rimble/icons";
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
  const [outcomes, setOutcomes] = useState<any[]>(["Trump", "Biden"]);

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
    const OUTCOMES = outcomes;

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
    setLoading(false);
    toggleModal();
  };

  const toggleModal = () =>
    modalDispatch({
      type: "TOGGLE_CREATE_MARKET_MODAL",
      payload: !modalState.createMarketModalIsOpen,
    });

  // Escape key hook
  // useEscapeKey(toggleModal);

  return (
    <Wrapper isOpen={isOpen}>
      <Modal>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Top>
              <Title>Create a Market</Title>
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
                    readOnly
                    //onChange={(e: any) => setMarketEventName(e.target.value)}
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
                    readOnly
                    //onChange={(e: any) => setRealitioQuestion(e.target.value)}
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
                    readOnly
                    //onChange={(e: any) => setArbitrator(e.target.value)}
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
                    readOnly
                    //onChange={(e: any) => setMarketOpeningTime(e.target.value)}
                  />
                </InputWrapper>
                <InputWrapper>
                  <Label htmlFor="marketLockingTime">Locking</Label>
                  <Input
                    type="number"
                    id="marketLockingTime"
                    value={marketLockingTime}
                    readOnly
                    // onChange={(e: any) => setMarketLockingTime(e.target.value)}
                  />
                </InputWrapper>
                <InputWrapper>
                  <Label htmlFor="marketResolutionTime">Resolution</Label>
                  <Input
                    type="number"
                    id="marketResolutionTime"
                    value={marketResolutionTime}
                    readOnly
                    // onChange={(e: any) =>
                    //   setMarketResolutionTime(e.target.value)
                    // }
                  />
                </InputWrapper>
                <InputWrapper>
                  <Label htmlFor="timeout">Timeout</Label>
                  <Input
                    type="number"
                    id="timeout"
                    value={timeout}
                    readOnly
                    //onChange={(e: any) => setTimeout(e.target.value)}
                  />
                </InputWrapper>
              </Section>
              <Section>
                <InputWrapper>
                  <Label>Outcomes</Label>
                  <Input
                    type="text"
                    placeholder="Token"
                    value={outcomes}
                    readOnly
                  />
                </InputWrapper>
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
