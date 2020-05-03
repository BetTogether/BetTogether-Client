import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  Wrapper,
  Modal,
  IconButton,
  Buttons,
  StyledButton,
  Logo,
} from "./SignInModal.style";
import Spinner from "./Spinner";
import { ReactComponent as CrossIcon } from "../../../assets/icons/cross.svg";
import { LayoutContext } from "../../../store/context/LayoutContext";
import { useWeb3Context } from "web3-react";
import portisLogo from "../../../assets/icons/portis.svg";
import metamaskLogo from "../../../assets/icons/metamask.svg";

interface ISignInModalProps {
  isOpen: boolean;
}

const SignInModal = ({ isOpen }: ISignInModalProps) => {
  const context = useWeb3Context();
  const { state, dispatch } = useContext(LayoutContext);
  const [loading, setLoading] = useState(false);

  const escFunction = useCallback(
    (event: any) => {
      if (event.keyCode === 27)
        dispatch({
          type: "TOGGLE_SIGN_IN_MODAL",
          payload: !state.signInModalIsOpen,
        });
    },
    [dispatch, state.signInModalIsOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [dispatch, escFunction, state.signInModalIsOpen]);

  const toggleModal = () => {
    dispatch({
      type: "TOGGLE_SIGN_IN_MODAL",
      payload: !state.signInModalIsOpen,
    });
  };

  const setConnector = async (type: string) => {
    setLoading(true);
    await context.setConnector(type);
    dispatch({
      type: "TOGGLE_SIGN_IN_MODAL",
      payload: !state.signInModalIsOpen,
    });
    setLoading(false);
  };

  return (
    <Wrapper isOpen={isOpen}>
      <Modal>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <IconButton onClick={() => toggleModal()}>
              <CrossIcon />
            </IconButton>
            <Buttons>
              <StyledButton onClick={() => setConnector("Injected")}>
                <Logo alt="MetaMask" src={metamaskLogo} />
                Connect with MetaMask
              </StyledButton>
              <StyledButton onClick={() => setConnector("Portis")}>
                <Logo alt="Portis" src={portisLogo} />
                Connect with Portis
              </StyledButton>
            </Buttons>
          </>
        )}
      </Modal>
    </Wrapper>
  );
};

export default SignInModal;
