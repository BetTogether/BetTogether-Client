import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import { ModalContext } from "store/context/ModalContext";
import { Clear } from "@rimble/icons";
import { ethers, utils, Contract } from "ethers";

import {
  MainWrapper,
  Modal,
  IconButton,
  Top,
  Title,
  Container,
  Column,
  Detail,
  Item,
  ItemDescription,
} from "./InfoModal.style";
import { shortenAddress } from "utils/ShortenAddress";
import BTMarketContract from "abis/BTMarket.json";
import BTMarketFactoryContract from "abis/BTMarketFactory.json";
import addresses, { KOVAN_ID } from "utils/addresses";

interface IInfoModalProps {
  isOpen: boolean;
}

declare let window: any;

const InfoModal = ({ isOpen }: IInfoModalProps) => {
  const { modalState, modalDispatch } = useContext(ModalContext);

  const factoryAddress = addresses[KOVAN_ID].marketFactory;
  const MarketStates = ["SETUP", "WAITING", "OPEN", "LOCKED", "WITHDRAW"];
  const [marketState, setMarketState] = useState<string>("");
  const [totalVotesForTrump, setTotalVotesForTrump] = useState<string>("");
  const [totalVotesForBiden, setTotalVotesForBiden] = useState<string>("");
  const [addressVotesForTrump, setAddressVotesForTrump] = useState<string>("");
  const [addressVotesForBiden, setAddressVotesForBiden] = useState<string>("");
  const [numberOfParticipants, setNumberOfParticipants] = useState<number>(0);
  const [pot, setPot] = useState<string>("");
  const [owner, setOwner] = useState<string>("");

  useEffect(() => {
    (async () => {
      const provider = new ethers.providers.Web3Provider(
        window.web3.currentProvider
      );

      const factoryContract = new Contract(
        factoryAddress,
        BTMarketFactoryContract.abi,
        provider
      );

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

        let numberOfTokenContracts = await marketContract.tokenContractsCreated();
        if (numberOfTokenContracts !== 0) {
          const DTNumberOfBets = await marketContract.totalBetsPerOutcome(0);
          //GOTTA BE A CLEANER WAY TO DO THIS...
          const fortmattedTrump = utils.formatUnits(DTNumberOfBets, 18);
          const floatTrump = parseFloat(fortmattedTrump);
          const roundedTrump = Math.ceil(floatTrump);
          setTotalVotesForTrump(roundedTrump.toString());

          const JBNumberOfBets = await marketContract.totalBetsPerOutcome(1);
          const fortmattedBiden = utils.formatUnits(JBNumberOfBets, 18);
          const floatBiden = parseFloat(fortmattedBiden);
          const roundedBiden = Math.ceil(floatBiden);
          setTotalVotesForBiden(roundedBiden.toString());

          const addressVotesForTrump = await marketContract.getParticipantsBet(
            0
          );
          console.log("addressVotesForTrump:", addressVotesForTrump.toString());
          setAddressVotesForTrump(addressVotesForTrump.toString());

          const addressVotesForBiden = await marketContract.getParticipantsBet(
            1
          );
          console.log("addressVotesForBiden:", addressVotesForBiden.toString());
          setAddressVotesForBiden(addressVotesForBiden.toString());
        }
      }
    })();
    //@eslint-disable-next-line
  }, [MarketStates, factoryAddress]);

  const toggleModal = () =>
    modalDispatch({
      type: "TOGGLE_INFO_MODAL",
      payload: !modalState.infoModalIsOpen,
    });

  //! CLOSE MODAL BY ESCAPE KEY OR CLICKING OUTSIDE ... EVENTUALLY MOVE
  const escFunction = useCallback(
    (event: any) => {
      if (event.keyCode === 27)
        modalDispatch({
          type: "TOGGLE_INFO_MODAL",
          payload: !modalState.infoModalIsOpen,
        });
    },
    [modalDispatch, modalState.infoModalIsOpen]
  );
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", escFunction, false);
      return () => {
        document.removeEventListener("keydown", escFunction, false);
      };
    }
  }, [escFunction, isOpen]);
  //! CLOSE MODAL BY ESCAPE KEY OR CLICKING OUTSIDE

  return (
    <MainWrapper isOpen={isOpen}>
      <Modal>
        <Top>
          <Title>Some important info...</Title>
          <IconButton onClick={() => toggleModal()}>
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
            <Item>
              <Detail>{totalVotesForTrump}</Detail>
              <ItemDescription>Votes for Trump</ItemDescription>
            </Item>
            <Item>
              <Detail>{totalVotesForBiden}</Detail>
              <ItemDescription>Votes for Biden</ItemDescription>
            </Item>
          </Column>
          <Column>
            <Item>
              <Detail>{addressVotesForTrump}</Detail>
              <ItemDescription>Your votes for Trump</ItemDescription>
            </Item>
            <Item>
              <Detail>{addressVotesForBiden}</Detail>
              <ItemDescription>Your votes for Biden</ItemDescription>
            </Item>
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
