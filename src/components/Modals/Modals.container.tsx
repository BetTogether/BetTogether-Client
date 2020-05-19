import React, { useContext } from "react";
import SignInModal from "./SignInModal";
import TradeModal from "./TradeModal";
import EmailModal from "./EmailModal";
import InfoModal from "./InfoModal";
import { ModalContext } from "store/Context";

const ModalsContainer = () => {
  const { modalState } = useContext(ModalContext);

  return (
    <>
      <SignInModal isOpen={modalState.signInModalIsOpen} />
      <TradeModal isOpen={modalState.tradeModalIsOpen} />
      <InfoModal isOpen={modalState.infoModalIsOpen} />
      <EmailModal isOpen={modalState.emailModalIsOpen} />
    </>
  );
};

export default ModalsContainer;
