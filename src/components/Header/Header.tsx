import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useWeb3Context } from "web3-react";
import { IconContext } from "react-icons";
import { AiFillGithub, AiFillBell } from "react-icons/ai";
import templogo from "assets/images/temp-logo.png";
import MenuIcon from "./MenuIcon";
import MobileDropdown from "./MobileDropdown";
import { ShortenAddress } from "utils/ShortenAddress";
import {
  Head,
  Logo,
  RightContent,
  ExpandButton,
  AddressWrapper,
  Address,
  IconLink,
  NetworkNotification,
} from "./Header.style";
import { LayoutContext } from "store/Context";

const Header = () => {
  const context = useWeb3Context();
  const { active, error, account, networkId } = context;
  const { state, dispatch } = useContext(LayoutContext);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const SignIn = () => {
    dispatch({
      type: "TOGGLE_SIGN_IN_MODAL",
      payload: !state.signInModalIsOpen,
    });
  };

  return (
    <>
      {active && networkId !== 4 && (
        <NetworkNotification currentNetwork={networkId} requiredNetwork={4} />
      )}
      <Head>
        <Link to="/dashboard">
          <Logo src={templogo} alt="BetTogetherLogo" />
        </Link>
        <RightContent>
          <IconLink
            href="https://github.com/BetTogether"
            target="_blank"
            rel="noreferrer noopener"
          >
            <IconContext.Provider value={{ color: "white", size: "2em" }}>
              <AiFillGithub />
            </IconContext.Provider>
          </IconLink>
          <IconLink href="#">
            <IconContext.Provider value={{ color: "white", size: "2em" }}>
              <AiFillBell />
            </IconContext.Provider>
          </IconLink>

          {active && !error ? (
            <>
              {account !== (undefined && null) && (
                <AddressWrapper onClick={() => context.unsetConnector()}>
                  <Address>{ShortenAddress(account)}</Address>
                </AddressWrapper>
              )}
            </>
          ) : (
            <AddressWrapper onClick={() => SignIn()}>Connect</AddressWrapper>
          )}
          <ExpandButton onClick={() => setIsExpanded(!isExpanded)}>
            <MenuIcon isExpanded={isExpanded} />
          </ExpandButton>
        </RightContent>
      </Head>
      {isExpanded && <MobileDropdown isExpanded={isExpanded} />}
    </>
  );
};

export default Header;
