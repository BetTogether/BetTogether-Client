import React, { useEffect, useContext, useRef } from "react";
import SignInModal from "./SignInModal";
import { LayoutContext } from "../../store/context/LayoutContext";

const TxModalsContainer = () => {
  const { state, dispatch } = useContext(LayoutContext);

  return (
    <>
      <SignInModal isOpen={state.signInModalIsOpen} />
    </>
  );
};

export default TxModalsContainer;
