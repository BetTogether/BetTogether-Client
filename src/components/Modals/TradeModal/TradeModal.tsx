import React, { useContext } from "react";
import { Wrapper, Modal, IconButton, Top, Title } from "./TradeModal.style";
import { LayoutContext } from "store/Context";
import { Clear } from "@rimble/icons";
import { useWeb3Context } from "web3-react";
import Uniswap from "./Exchanges/Uniswap";
import Kyber from "./Exchanges/Kyber";

interface ITradeModal {
  isOpen: boolean;
}

const TradeModal = ({ isOpen }: ITradeModal) => {
  const { state, dispatch } = useContext(LayoutContext);
  const context = useWeb3Context();
  const { active, account, networkId } = context;

  const toggleModal = () =>
    dispatch({ type: "TOGGLE_TRADE_MODAL", payload: !state.tradeModalIsOpen });

  return (
    <Wrapper isOpen={isOpen}>
      <Modal>
        <Top>
          <Title>ETH &#x2192; DAI</Title>
          <IconButton onClick={() => toggleModal()}>
            <Clear />
          </IconButton>
        </Top>
        <Uniswap />
        {networkId === 4 && <Kyber />}
      </Modal>
    </Wrapper>
  );
};

export default TradeModal;
