import React, { useState, useEffect } from "react";
import { DAI_ABI } from "../../abi/daiABI";
import ethIcon from "../../assets/icons/eth.svg";
import daiIcon from "../../assets/icons/dai.svg";
import MenuIcon from "./MenuIcon";
import SideBar from "./SideBar";
import { IconContext } from "react-icons";
import { AiFillGithub } from "react-icons/ai";
import { ethers, Contract } from "ethers";
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
import web3 from "web3";
const providers = require("ethers/providers");

const Navbar = ({
  activeAddress,
  connectWallet,
  ethBalance,
  daiBalance,
}: any) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const DAI_ADDRESS = "0x2448eE2641d78CC42D7AD76498917359D961A783";

  const options = {
    address: activeAddress,
    provider: providers.getDefaultProvider("rinkeby"),
  };

  useEffect(() => {
    (async () => {
      if (activeAddress) {
        const contract = new Contract(DAI_ADDRESS, DAI_ABI, options.provider);
        const balance = await contract.balanceOf(activeAddress);
        // ethers.utils.formatEther(balance)
        return balance.toString();
      }
    })();
  }, [activeAddress, options.provider]);

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
