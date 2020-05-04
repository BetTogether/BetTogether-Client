import React, { useContext } from "react";
import SignInModal from "./SignInModal";
import TradeModal from "./TradeModal";
import { LayoutContext } from "store/Context";

const ModalsContainer = () => {
  const { state } = useContext(LayoutContext);

  return (
    <>
      <SignInModal isOpen={state.signInModalIsOpen} />
      <TradeModal isOpen={state.tradeModalIsOpen} />
    </>
  );
};

export default ModalsContainer;
