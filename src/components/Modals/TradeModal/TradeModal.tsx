import React, { useContext } from "react";
import { Wrapper, Modal, IconButton, Top, Title } from "./TradeModal.style";
import { LayoutContext } from "store/Context";
import { Clear } from "@rimble/icons";
import Uniswap from "./Exchanges/Uniswap";
import Kyber from "./Exchanges/Kyber";
import PBTC from "./Exchanges/PBTC";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

interface ITradeModal {
  isOpen: boolean;
}

const TradeModal = ({ isOpen }: ITradeModal) => {
  const { state, dispatch } = useContext(LayoutContext);
  const context = useWeb3React<Web3Provider>();
  const { active, account, chainId } = context;

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
        {chainId === 4 && <Kyber />}
        <Top>
          <Title>BTC &#x2192; PBCT</Title>
          <IconButton onClick={() => toggleModal()}>
            <Clear />
          </IconButton>
        </Top>
        <PBTC />
      </Modal>
    </Wrapper>
  );
};

export default TradeModal;
