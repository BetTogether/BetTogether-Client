import React, { useContext } from "react";
import SignInModal from "./SignInModal";
import TradeModal from "./TradeModal";
import EmailModal from "./EmailModal";
import { LayoutContext } from "store/Context";

const ModalsContainer = () => {
  const { state } = useContext(LayoutContext);

  return (
    <>
      <SignInModal isOpen={state.signInModalIsOpen} />
      <TradeModal isOpen={state.tradeModalIsOpen} />
      <EmailModal isOpen={state.emailModalIsOpen} />
    </>
  );
};

export default ModalsContainer;
