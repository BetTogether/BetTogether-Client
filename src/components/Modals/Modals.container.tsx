import React, { useContext } from "react";
import SignInModal from "./SignInModal";
import TradeModal from "./TradeModal";
import EmailModal from "./EmailModal";
import InfoModal from "./InfoModal";
import { ModalContext } from "store/context/ModalContext";

const ModalsContainer = ({ active }: any) => {
  const { modalState } = useContext(ModalContext);

  return (
    <>
      {active ? (
        <>
          <TradeModal isOpen={modalState.tradeModalIsOpen} />
          <InfoModal isOpen={modalState.infoModalIsOpen} />
          <EmailModal isOpen={modalState.emailModalIsOpen} />
        </>
      ) : (
        <SignInModal isOpen={modalState.signInModalIsOpen} />
      )}
    </>
  );
};

export default ModalsContainer;
