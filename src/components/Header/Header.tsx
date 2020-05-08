import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useWeb3Context } from "web3-react";
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
import { ShortenAddress } from "utils/ShortenAddress";
import { ReactComponent as Github } from "assets/github.svg";
const Box = require("3box");

const Header = () => {
  const context = useWeb3Context();
  const { active, error, account, networkId } = context;
  const { state, dispatch } = useContext(LayoutContext);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [imageLink, setImageLink] = useState("");

  useEffect(() => {
    (async () => {
      if (active) {
        const profile = await Box.getProfile(account);
        if (profile.image) {
          let imageLink = profile.image[0]["contentUrl"]["/"];
          let newLink = `https://ipfs.infura.io/ipfs/${imageLink}`;
          setImageLink(newLink);
        }
      }
    })();
  }, [active]);

  const SignIn = () => {
    dispatch({
      type: "TOGGLE_SIGN_IN_MODAL",
      payload: !state.signInModalIsOpen,
    });
  };

  return (
    <>
      {active && networkId !== 42 && (
        <NetworkNotification currentNetwork={networkId} requiredNetwork={42} />
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
              {account !== (undefined && null) && (
                <>
                  {imageLink ? (
                    <ImageButton onClick={() => context.unsetConnector()}>
                      <Image src={imageLink} alt="3Box profile picture" />
                    </ImageButton>
                  ) : (
                    <ImageButton onClick={() => context.unsetConnector()}>
                      <Image
                        src="https://www.sackettwaconia.com/wp-content/uploads/default-profile.png"
                        alt="default profile picture"
                      />
                    </ImageButton>
                  )}

                  <ConnectionButton onClick={() => context.unsetConnector()}>
                    <Address>{ShortenAddress(account)}</Address>
                  </ConnectionButton>
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
