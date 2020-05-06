import React, { useContext } from "react";
import { Wrapper, Modal, IconButton, Top, Title } from "./TradeModal.style";
import { LayoutContext } from "store/Context";
import { Clear } from "@rimble/icons";
import Uniswap from "./Exchanges/Uniswap";
import Kyber from "./Exchanges/Kyber";

interface ITradeModal {
  isOpen: boolean;
}

const TradeModal = ({ isOpen }: ITradeModal) => {
  const { state, dispatch } = useContext(LayoutContext);

  const toggleModal = () =>
    dispatch({ type: "TOGGLE_TRADE_MODAL", payload: !state.tradeModalIsOpen });

  return (
    <Wrapper isOpen={isOpen}>
      <Modal>
        <Top>
          <Title>Get Some Dai...</Title>
          <IconButton onClick={() => toggleModal()}>
            <Clear />
          </IconButton>
        </Top>
        <Uniswap />
        <Kyber />
      </Modal>
    </Wrapper>
  );
};

export default TradeModal;
