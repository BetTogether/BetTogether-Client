import React, { useContext } from "react";
import SignInModal from "./SignInModal";
import TradeModal from "./TradeModal";
import EmailModal from "./EmailModal";
import InfoModal from "./InfoModal";
import { LayoutContext } from "store/Context";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

const ModalsContainer = () => {
  const { state } = useContext(LayoutContext);
  const context = useWeb3React<Web3Provider>();
  const { chainId } = context;
  const kovanNetworkId = 42;

  return (
    <>
      <SignInModal isOpen={state.signInModalIsOpen} />
      <TradeModal isOpen={state.tradeModalIsOpen} />
      <EmailModal isOpen={state.emailModalIsOpen} />
      {chainId === kovanNetworkId && (
        <InfoModal isOpen={state.infoModalIsOpen} />
      )}
    </>
  );
};

export default ModalsContainer;
