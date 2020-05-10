import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  Wrapper,
  Modal,
  IconButton,
  Buttons,
  StyledButton,
  Logo,
  ProviderWrapper,
  ProviderContent,
  ProviderTitle,
  ProviderDescription,
} from "./SignInModal.style";
import { ReactComponent as CrossIcon } from "assets/cross.svg";
import { LayoutContext } from "store/Context";
import { useWeb3Context } from "web3-react";
import portisLogo from "assets/portis.svg";
import metamaskLogo from "assets/metamask.svg";
import { Loader } from "rimble-ui";

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
          <Loader />
        ) : (
          <>
            <IconButton onClick={() => toggleModal()}>
              <CrossIcon />
            </IconButton>
            <Buttons>
              <ProviderWrapper>
                <ProviderContent>
                  <StyledButton onClick={() => setConnector("Injected")}>
                    <Logo alt="MetaMask" src={metamaskLogo} />
                    <ProviderTitle>MetaMask</ProviderTitle>
                    <ProviderDescription>
                      Connect with your MetaMask account
                    </ProviderDescription>
                  </StyledButton>
                </ProviderContent>
              </ProviderWrapper>
              <ProviderWrapper>
                <ProviderContent>
                  <StyledButton onClick={() => setConnector("Portis")}>
                    <Logo alt="Portis" src={portisLogo} />
                    <ProviderTitle>Portis</ProviderTitle>
                    <ProviderDescription>
                      Connect with your Portis account
                    </ProviderDescription>
                  </StyledButton>
                </ProviderContent>
              </ProviderWrapper>
            </Buttons>
          </>
        )}
      </Modal>
    </Wrapper>
  );
};

export default SignInModal;
