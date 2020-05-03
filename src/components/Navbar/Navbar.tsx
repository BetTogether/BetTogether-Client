import React, { useState, useContext } from "react";
import { useWeb3Context } from "web3-react";
import { IconContext } from "react-icons";
import { AiFillGithub, AiFillBell } from "react-icons/ai";
import templogo from "../../assets/images/temp-logo.png";
import MenuIcon from "./MenuIcon";
import MobileDropdown from "./MobileDropdown";
import { ShortenAddress } from "../../utils/ShortenAddress";
import {
  Header,
  StyledLink,
  Logo,
  RightContent,
  ExpandButton,
  AddressWrapper,
  Address,
  IconButton,
} from "./Navbar.style";
import { LayoutContext } from "../../store/context/LayoutContext";

interface INavbar {
  activeAddress?: any;
  enableWallet: () => any;
  disableWallet: () => any;
}

const Navbar = () => {
  const context = useWeb3Context();
  const { active, error, account } = context;

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
      <Header>
        <Logo src={templogo}></Logo>
        <StyledLink to="/dashboard">Dashboard</StyledLink>
        <StyledLink to="/markets">Markets</StyledLink>
        <StyledLink to="/profile">Profile</StyledLink>
        <StyledLink to="/settings">Settings</StyledLink>
        <RightContent>
          <IconButton>
            <IconContext.Provider value={{ color: "#252c41", size: "2.5em" }}>
              <AiFillGithub />
            </IconContext.Provider>
          </IconButton>
          <IconButton>
            <IconContext.Provider value={{ color: "#252c41", size: "2.5em" }}>
              <AiFillBell />
            </IconContext.Provider>
          </IconButton>

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
      </Header>
      {isExpanded && <MobileDropdown />}
    </>
  );
};

export default Navbar;
