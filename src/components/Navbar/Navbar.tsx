import React, { useState } from "react";
import { IconContext } from "react-icons";
import { AiFillGithub } from "react-icons/ai";
import ethIcon from "../../assets/icons/eth.svg";
import daiIcon from "../../assets/icons/dai.svg";
import MenuIcon from "./MenuIcon";
import SideBar from "./SideBar";
import { ShortenAddress } from "../../utils/ShortenAddress";
import {
  Header,
  ExpandButton,
  Wallet,
  Buttons,
  Button,
  ConnectWalletButton,
  WalletWrapper,
  WalletContent,
  UserIcon,
  UserSpan,
  IconButton,
} from "./Navbar.style";

const Navbar = ({
  activeAddress,
  connectWallet,
  ethBalance,
  daiBalance,
}: any) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <Header>
      <ExpandButton onClick={() => setIsExpanded(!isExpanded)}>
        <MenuIcon isExpanded={isExpanded} />
      </ExpandButton>
      <SideBar isExpanded={isExpanded} />

      {activeAddress ? (
        <WalletWrapper>
          <WalletContent address>
            <UserSpan>{ShortenAddress(activeAddress)}</UserSpan>
          </WalletContent>
          <WalletContent>
            <UserIcon src={ethIcon} alt="eth icon" />
            <UserSpan>{ethBalance}</UserSpan>
          </WalletContent>
          <WalletContent amount>
            <UserIcon src={daiIcon} alt="dai icon" />
            <UserSpan>{daiBalance ? daiBalance : 0}</UserSpan>
          </WalletContent>
        </WalletWrapper>
      ) : (
        <WalletWrapper>
          {/* <ConnectWalletButton connectWallet={() => connectWallet()} /> */}
        </WalletWrapper>
      )}
      <Buttons>
        <IconContext.Provider value={{ color: "white", size: "2.5em" }}>
          <IconButton>
            <AiFillGithub />
          </IconButton>
        </IconContext.Provider>
      </Buttons>
    </Header>
  );
};

export default Navbar;
