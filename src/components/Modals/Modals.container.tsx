import React, { useContext } from "react";

import { ModalContext } from "store/context/ModalContext";

import CreateMarketModal from "./CreateMarketModal";
import SignInModal from "./SignInModal";
import TradeModal from "./TradeModal";
import EmailModal from "./EmailModal";
import InfoModal from "./InfoModal";

const ModalsContainer = ({ active }: any) => {
  const { modalState } = useContext(ModalContext);

  return (
    <>
      {active ? (
        <>
          <CreateMarketModal isOpen={modalState.createMarketModalIsOpen} />
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
