import React, { useState, useEffect, useContext } from "react";
import { LayoutContext } from "store/Context";
import { Clear } from "@rimble/icons";
import { ethers, utils } from "ethers";

import {
  MainWrapper,
  Modal,
  IconButton,
  Top,
  Title,
  Container,
  Detail,
  Item,
  ItemDescription,
} from "./InfoModal.style";
import { shortenAddress } from "utils/shortenAddress";
import BTMarketContract from "contracts/BTMarket.json";
import BTMarketFactoryContract from "contracts/BTMarketFactory.json";
import addresses, { KOVAN_ID } from "contracts/addresses";

interface IInfoModalProps {
  isOpen: boolean;
}

const InfoModal = ({ isOpen }: IInfoModalProps) => {
  const { state, dispatch } = useContext(LayoutContext);

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
        (window as any).web3.currentProvider
      );

      const factoryContract = new ethers.Contract(
        factoryAddress,
        BTMarketFactoryContract.abi,
        provider
      );

      let deployedMarkets = await factoryContract.getMarkets();

      let mostRecentlyDeployedAddress =
        deployedMarkets[deployedMarkets.length - 1];

      const marketContract = new ethers.Contract(
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
      const unformatted = pot.toString();
      setPot(utils.formatUnits(unformatted, 18));

      const DTNumberOfBets = await marketContract.totalBetsPerOutcome(0);
      const addressVotesForTrump = await marketContract.getParticipantsBet(0);
      setAddressVotesForTrump(addressVotesForTrump.toString());

      const fortmattedTrump = utils.formatUnits(DTNumberOfBets, 18);
      let ceilstring = parseFloat(fortmattedTrump);
      let ceil = Math.ceil(ceilstring);
      setTotalVotesForTrump(ceil + "");

      const JBNumberOfBets = await marketContract.totalBetsPerOutcome(1);
      const addressVotesForBiden = await marketContract.getParticipantsBet(1);
      setAddressVotesForBiden(addressVotesForBiden.toString());
      setTotalVotesForBiden(JBNumberOfBets.toString());
    })();
  }, []);

  const toggleModal = () =>
    dispatch({ type: "TOGGLE_INFO_MODAL", payload: !state.infoModalIsOpen });

  return (
    <MainWrapper isOpen={isOpen}>
      <Modal>
        <Top>
          <Title>Some important info to know...</Title>
          <IconButton onClick={() => toggleModal()}>
            <Clear />
          </IconButton>
        </Top>
        <Container>
          <Item>
            <Detail>{totalVotesForTrump}</Detail>
            <ItemDescription>Total votes for Trump</ItemDescription>
          </Item>
          <Item>
            <Detail>{totalVotesForBiden}</Detail>
            <ItemDescription>Total votes for Biden</ItemDescription>
          </Item>
          <Item>
            <Detail>{addressVotesForTrump}</Detail>
            <ItemDescription>This address's Votes for Trump</ItemDescription>
          </Item>
          <Item>
            <Detail>{addressVotesForBiden}</Detail>
            <ItemDescription>This address's Votes for Biden</ItemDescription>
          </Item>
          <Item>
            <Detail>{numberOfParticipants}</Detail>
            <ItemDescription>Number of Participants</ItemDescription>
          </Item>
          <Item>
            <Detail>{pot}</Detail>
            <ItemDescription>Total Pot Size (in Dai)</ItemDescription>
          </Item>
          <Item>
            <Detail>{shortenAddress(owner)}</Detail>
            <ItemDescription>Contract Owner</ItemDescription>
          </Item>
          <Item>
            <Detail>{marketState}</Detail>
            <ItemDescription>Market State</ItemDescription>
          </Item>
        </Container>
      </Modal>
    </MainWrapper>
  );
};

export default InfoModal;
