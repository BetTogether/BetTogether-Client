import React, { useContext } from "react";
import { Wrapper, Modal, IconButton, Top, Title } from "./TradeModal.style";
import { ModalContext } from "store/context/ModalContext";
import { ReactComponent as CrossIcon } from "assets/cross.svg";
import Uniswap from "./Exchanges/Uniswap";
import PBTC from "./Exchanges/PBTC";
import { useEscapeKey } from "utils/hooks";

interface ITradeModal {
  isOpen: boolean;
}

const TradeModal = ({ isOpen }: ITradeModal) => {
  const { modalState, modalDispatch } = useContext(ModalContext);

  const toggleModal = () =>
    modalDispatch({
      type: "TOGGLE_TRADE_MODAL",
      payload: !modalState.tradeModalIsOpen,
    });

  // Escape key hook
  //useEscapeKey(toggleModal);

  return (
    <Wrapper isOpen={isOpen}>
      <Modal>
        <Top>
          <Title>ETH &#x2192; DAI</Title>
          <IconButton onClick={() => toggleModal()}>
            <CrossIcon />
          </IconButton>
        </Top>
        {/* <Uniswap /> */}
        {/* <Top>
          <Title>BTC &#x2192; PBCT</Title>
        </Top>
        <PBTC /> */}
      </Modal>
    </Wrapper>
  );
};

export default TradeModal;
