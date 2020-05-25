import React, { useState, useEffect } from "react";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import Box from "3box";

import { useEagerConnect, useInactiveListener } from "utils/hooks";
import MenuIcon from "./MenuIcon";
import MobileDropdown from "./MobileDropdown";
import {
  Head,
  Logo,
  LogoWrapper,
  Span,
  GitHubLink,
  RightContent,
  ExpandButton,
  ConnectionButton,
  Address,
  Image,
  ImageButton,
} from "./Header.style";
import { shortenAddress } from "utils/ShortenAddress";
import { ReactComponent as Github } from "assets/github.svg";
import { injected } from "utils/connectors";

const Header = () => {
  const context = useWeb3React();
  const { account, active, activate, connector, deactivate, error } = context;

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [image, setImage] = useState<any>();

  const [activatingConnector, setActivatingConnector] = useState<
    AbstractConnector
  >();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector)
      setActivatingConnector(undefined);
  }, [activatingConnector, connector]);

  const triedEager = useEagerConnect();

  useInactiveListener(!triedEager || !!activatingConnector);

  const currentConnector = injected;
  const connected = currentConnector === connector;
  const disabled = connected || !!error;

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
          <LogoWrapper>
            {/* eslint-disable-next-line */}
            <Span role="img" aria-label="tophat">
              🎩
            </Span>
            <Logo>MagicBet</Logo>
          </LogoWrapper>
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
              disabled={disabled}
              onClick={() => {
                setActivatingConnector(currentConnector);
                activate(injected);
              }}
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
