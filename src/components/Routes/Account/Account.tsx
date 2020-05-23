import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import Box from "3box";

import Container from "components/Routes/RoutesContainer";
import BoxLogo from "assets/threebox.svg";
import {
  Content,
  Border,
  Top,
  Title,
  Wrapper,
  AccountDetails,
  Name,
  Detail,
  LogoImage,
  ThreeBoxLink,
  ThreeBoxWrapper,
} from "./Account.style";

const Account = () => {
  const { active, account } = useWeb3React<Web3Provider>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [box, setBox] = useState("");

  useEffect(() => {
    (async () => {
      if (active) {
        const profile = await Box.getProfile(account);
        setName(profile.name);
        const boxProvider = await Box.get3idConnectProvider();
        const box = await Box.openBox(account, boxProvider);
        console.log("box:", box);
        setBox(box);
        await box.syncDone;
        const email = await box.private.get("email");
        console.log("email:", email);
        setEmail(email);
      }
    })();
  }, [active, account]);

  return (
    <Container>
      <Content>
        <Border>
          <Top>
            <Title>Account</Title>
          </Top>
          {active && (
            <>
              {box ? (
                <Wrapper>
                  <AccountDetails>
                    <Name>{name}</Name>
                    <Detail>{account}</Detail>
                    <Detail>{email}</Detail>
                  </AccountDetails>
                </Wrapper>
              ) : (
                <ThreeBoxWrapper>
                  <ThreeBoxLink
                    href="https://3box.io/hub"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Help grow the next web with
                    <LogoImage src={BoxLogo} alt="3Box logo" />
                  </ThreeBoxLink>
                </ThreeBoxWrapper>
              )}
            </>
          )}
        </Border>
      </Content>
    </Container>
  );
};

export default Account;
