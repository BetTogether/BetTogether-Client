import React, { useContext } from "react";
import SignInModal from "./SignInModal";
import { LayoutContext } from "store/Context";

const ModalsContainer = () => {
  const { state } = useContext(LayoutContext);

  return (
    <>
      <SignInModal isOpen={state.signInModalIsOpen} />
    </>
  );
};

export default ModalsContainer;
