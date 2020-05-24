import React, { useState, useEffect, useContext } from "react";
import { ModalContext } from "store/context/ModalContext";
import { Clear } from "@rimble/icons";
import { providers, utils, Contract } from "ethers";
import { v4 as uuidv4 } from "uuid";

import {
  MainWrapper,
  Modal,
  IconButton,
  Top,
  Container,
  Column,
  Detail,
  Item,
  ItemDescription,
} from "./InfoModal.style";
import { shortenAddress } from "utils/ShortenAddress";
import BTMarketContract from "abis/BTMarket.json";
import { ContractContext } from "store/context/ContractContext";
//import { useEscapeKey } from "utils/hooks";

interface IInfoModalProps {
  isOpen: boolean;
}

interface IOutcomeObject {
  name: string;
  bets: number;
}

declare let window: any;

const InfoModal = ({ isOpen }: IInfoModalProps) => {
  const { modalState, modalDispatch } = useContext(ModalContext);
  const { contractState } = useContext(ContractContext);
  const factoryContract = contractState[0];

  const MarketStates = ["SETUP", "WAITING", "OPEN", "LOCKED", "WITHDRAW"];
  const [marketState, setMarketState] = useState<string>("");
  const [pot, setPot] = useState<string>("");
  const [owner, setOwner] = useState<string>("");
  const [numberOfParticipants, setNumberOfParticipants] = useState<number>(0);
  const [outcomeNamesAndAmounts, setOutcomeNamesAndAmounts] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const provider = new providers.Web3Provider(window.web3.currentProvider);

      let deployedMarkets = await factoryContract.getMarkets();

      let mostRecentlyDeployedAddress =
        deployedMarkets[deployedMarkets.length - 1];

      if (deployedMarkets.length !== 0) {
        const marketContract = new Contract(
          mostRecentlyDeployedAddress,
          BTMarketContract.abi,
          provider
        );

        const marketState = await marketContract.state();
        setMarketState(MarketStates[marketState]);
        const owner = await marketContract.owner();
        setOwner(owner);
        const numberOfParticipants = await marketContract.getMarketSize();
        setNumberOfParticipants(numberOfParticipants.toNumber());
        const pot = await marketContract.totalBets();
        setPot(utils.formatUnits(pot.toString(), 18));

        let numberOfOutcomes = await marketContract.numberOfOutcomes();

        if (numberOfOutcomes !== 0) {
          let newOutcomesArray = [];
          for (let i = 0; i < numberOfOutcomes; i++) {
            let newOutcome: IOutcomeObject = { name: "", bets: 0 };

            const outcomeName = await marketContract.outcomeNames(i);
            newOutcome.name = outcomeName;

            //outcome bets
            const numberOfBets = await marketContract.totalBetsPerOutcome(i);
            const fortmatted = utils.formatUnits(numberOfBets, 18);
            const float = parseFloat(fortmatted);
            const bet = Math.ceil(float);
            newOutcome.bets = bet;
            newOutcomesArray.push(newOutcome);
          }
          setOutcomeNamesAndAmounts(newOutcomesArray);
        }
      }
    })();
  }, [MarketStates, factoryContract]);

  // Escape key hook
  // useEscapeKey(() =>
  //   modalDispatch({
  //     type: "TOGGLE_INFO_MODAL",
  //     payload: !modalState.infoModalIsOpen,
  //   })
  // );

  return (
    <MainWrapper isOpen={isOpen}>
      <Modal>
        <Top>
          <IconButton
            onClick={() =>
              modalDispatch({
                type: "TOGGLE_INFO_MODAL",
                payload: !modalState.infoModalIsOpen,
              })
            }
          >
            <Clear />
          </IconButton>
        </Top>
        <Container>
          <Column>
            <Item>
              <Detail>{shortenAddress(owner)}</Detail>
              <ItemDescription>Contract Owner</ItemDescription>
            </Item>
            <Item>
              <Detail>{marketState}</Detail>
              <ItemDescription>Market State</ItemDescription>
            </Item>
            {outcomeNamesAndAmounts &&
              outcomeNamesAndAmounts.map((outcome: any) => (
                <Item key={uuidv4()}>
                  <Detail>{outcome.bets}</Detail>
                  <ItemDescription>Bets for {outcome.name}</ItemDescription>
                </Item>
              ))}

            <Item>
              <Detail>{numberOfParticipants}</Detail>
              <ItemDescription>Number of Participants</ItemDescription>
            </Item>
            <Item>
              <Detail>{pot}</Detail>
              <ItemDescription>Total Pot Size (in Dai)</ItemDescription>
            </Item>
          </Column>
        </Container>
      </Modal>
    </MainWrapper>
  );
};

export default InfoModal;
