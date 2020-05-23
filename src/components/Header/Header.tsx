import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import Box from "3box";

import { getNetwork } from "utils/connectors";
import { useEagerConnect } from "utils/hooks";
import MenuIcon from "./MenuIcon";
import MobileDropdown from "./MobileDropdown";
import {
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
import { ModalContext } from "store/context/ModalContext";
import { shortenAddress } from "utils/ShortenAddress";
import { ReactComponent as Github } from "assets/github.svg";

const Header = () => {
  const { active, error, account, activate, deactivate } = useWeb3React<
    Web3Provider
  >();

  const { modalState, modalDispatch } = useContext(ModalContext);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [image, setImage] = useState<any>();
  const tried = useEagerConnect();

  useEffect(() => {
    if (tried && !active) activate(getNetwork(42));
  }, [activate, active, tried]);

  useEffect(() => {
    (async () => {
      if (active) {
        try {
          const profile = await Box.getProfile(account);
          if (profile.image) {
            let image = profile.image[0]["contentUrl"]["/"];
            setImage(image);
          }
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, [active, account]);

  return (
    <>
      <Head>
        <Link to="/dashboard">
          <Logo>MagicBet</Logo>
        </Link>
        <RightContent>
          <GitHubLink
            href="https://github.com/MagicBet"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Github"
          >
            <Github />
          </GitHubLink>

          {active && !error ? (
            <>
              {account !== null && (
                <>
                  {image ? (
                    <ImageButton onClick={() => deactivate()}>
                      <Image
                        src={`https://ipfs.infura.io/ipfs/${image}`}
                        alt="3Box profile picture"
                      />
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
            <ConnectionButton
              onClick={() =>
                modalDispatch({
                  type: "TOGGLE_SIGN_IN_MODAL",
                  payload: !modalState.signInModalIsOpen,
                })
              }
            >
              Connect
            </ConnectionButton>
          )}
          {active && (
            <ExpandButton onClick={() => setIsExpanded(!isExpanded)}>
              <MenuIcon isExpanded={isExpanded} />
            </ExpandButton>
          )}
        </RightContent>
      </Head>
      {active && (
        <MobileDropdown isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      )}
    </>
  );
};

export default Header;
