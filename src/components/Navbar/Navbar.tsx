import React, { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import { AiFillGithub } from "react-icons/ai";
import { ethers } from "ethers";
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
  NetworkNotification,
} from "./Navbar.style";

const Navbar = ({
  activeAddress,
  connectWallet,
  ethBalance,
  daiBalance,
}: any) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [networkId, setNetworkId] = useState(0);
  const provider = new ethers.providers.Web3Provider(
    (window as any).web3.currentProvider
  );

  useEffect(() => {
    (async () => {
      let networkId = await provider.getNetwork();
      setNetworkId(networkId.chainId);
    })();
  }, [provider]);

  return (
    <Header>
      <ExpandButton onClick={() => setIsExpanded(!isExpanded)}>
        <MenuIcon isExpanded={isExpanded} />
      </ExpandButton>
      <SideBar isExpanded={isExpanded} />

      {networkId !== 4 && (
        <NetworkNotification currentNetwork={networkId} requiredNetwork={4} />
      )}

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
