import React, { useContext } from "react";

import { ModalContext } from "store/context/ModalContext";

import CreateMarketModal from "./CreateMarketModal";
import InfoModal from "./InfoModal";

const ModalsContainer = ({ active }: any) => {
  const { modalState } = useContext(ModalContext);

  return (
    <>
      {active && (
        <>
          <CreateMarketModal isOpen={modalState.createMarketModalIsOpen} />
          <InfoModal isOpen={modalState.infoModalIsOpen} />
        </>
      )}
    </>
  );
};

export default ModalsContainer;
