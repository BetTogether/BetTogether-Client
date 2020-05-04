import React, { useContext } from "react";
import { Wrapper, Modal, IconButton, Top, Title } from "./TradeModal.style";
import { LayoutContext } from "store/Context";
import Uniswap from "./Exchanges/Uniswap";
import Balancer from "./Exchanges/Balancer";
import Kyber from "./Exchanges/Kyber";

const TradeModal = ({ isOpen }: any) => {
  const { state, dispatch } = useContext(LayoutContext);

  const toggleModal = () => {
    dispatch({ type: "TOGGLE_TRADE_MODAL", payload: !state.tradeModalIsOpen });
  };

  return (
    <Wrapper isOpen={isOpen}>
      <Modal>
        <Top>
          <Title>Get Some Dai...</Title>
          <IconButton onClick={() => toggleModal()}>
            <svg
              fill="gray"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
            </svg>
          </IconButton>
        </Top>
        <Uniswap />
        <Balancer />
        <Kyber />
      </Modal>
    </Wrapper>
  );
};

export default TradeModal;
