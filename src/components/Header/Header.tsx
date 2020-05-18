import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import MenuIcon from "./MenuIcon";
import MobileDropdown from "./MobileDropdown";
import {
  NetworkNotification,
  Head,
  Logo,
  GitHubLink,
  RightContent,
  ExpandButton,
  ConnectionButton,
  Address,
  Image,
  ImageButton,
} from "./Header.style";
import { LayoutContext } from "store/Context";
import { shortenAddress } from "utils/shortenAddress";
import { ReactComponent as Github } from "assets/github.svg";
import Box from "3box";

const Header = () => {
  const context = useWeb3React<Web3Provider>();
  const { active, error, account, deactivate, chainId } = context;

  const { state, dispatch } = useContext(LayoutContext);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [imageLink, setImageLink] = useState("");

  useEffect(() => {
    (async () => {
      if (active) {
        try {
          const profile = await Box.getProfile(account);
          if (profile.image) {
            let imageLink = profile.image[0]["contentUrl"]["/"];
            let newLink = `https://ipfs.infura.io/ipfs/${imageLink}`;
            setImageLink(newLink);
          }
        } catch (error) {
          console.log("error:", error);
        }
      }
    })();
  }, [active, account]);

  const SignIn = () => {
    dispatch({
      type: "TOGGLE_SIGN_IN_MODAL",
      payload: !state.signInModalIsOpen,
    });
  };

  return (
    <>
      {active && chainId !== 42 && (
        <NetworkNotification currentNetwork={chainId} requiredNetwork={42} />
      )}
      <Head>
        <Link to="/dashboard">
          <Logo>BetTogether</Logo>
        </Link>
        <RightContent>
          <GitHubLink
            href="https://github.com/BetTogether"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Github />
          </GitHubLink>

          {active && !error ? (
            <>
              {account !== null && (
                <>
                  {imageLink ? (
                    <ImageButton onClick={() => deactivate()}>
                      <Image src={imageLink} alt="3Box profile picture" />
                    </ImageButton>
                  ) : (
                    <ConnectionButton onClick={() => deactivate()}>
                      <Address>{shortenAddress(account)}</Address>
                    </ConnectionButton>
                  )}
                </>
              )}
            </>
          ) : (
            <ConnectionButton onClick={() => SignIn()}>
              Connect
            </ConnectionButton>
          )}
          <ExpandButton onClick={() => setIsExpanded(!isExpanded)}>
            <MenuIcon isExpanded={isExpanded} />
          </ExpandButton>
        </RightContent>
      </Head>
      <MobileDropdown isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
    </>
  );
};

export default Header;
