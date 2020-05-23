import React, { useContext } from "react";

import { ModalContext } from "store/context/ModalContext";

import CreateMarketModal from "./CreateMarketModal";
import SignInModal from "./SignInModal";
import InfoModal from "./InfoModal";

const ModalsContainer = ({ active }: any) => {
  const { modalState } = useContext(ModalContext);

  return (
    <>
      {active ? (
        <>
          <CreateMarketModal isOpen={modalState.createMarketModalIsOpen} />
          <InfoModal isOpen={modalState.infoModalIsOpen} />
        </>
      ) : (
        <SignInModal isOpen={modalState.signInModalIsOpen} />
      )}
    </>
  );
};

export default ModalsContainer;
