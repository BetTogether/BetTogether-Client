import React, { useState } from "react";
import { IconContext } from "react-icons";
import { AiFillGithub, AiFillBell } from "react-icons/ai";
import templogo from "../../assets/images/temp-logo.png";
import MenuIcon from "./MenuIcon";
import MobileDropdown from "./MobileDropdown";
import { ShortenAddress } from "../../utils/ShortenAddress";
import {
  Header,
  Link,
  Logo,
  RightContent,
  ExpandButton,
  AddressWrapper,
  Address,
  IconButton,
} from "./Navbar.style";

const Navbar = ({ activeAddress, connectWallet }: any) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <>
      <Header>
        <Logo src={templogo}></Logo>
        {/* DESKTOP LINKS */}
        {/* <Link>Dashboard</Link>
        <Link>Markets</Link>
        <Link>Profile</Link>
        <Link>Settings</Link> */}
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

          {activeAddress ? (
            <AddressWrapper>
              <Address>{ShortenAddress(activeAddress)}</Address>
            </AddressWrapper>
          ) : (
            <AddressWrapper onClick={() => connectWallet()}>
              Connect
            </AddressWrapper>
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