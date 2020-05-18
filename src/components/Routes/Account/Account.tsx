import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import Box from "3box";

import Container from "components/Routes/RoutesContainer";
import {
  Content,
  Border,
  Top,
  Title,
  Wrapper,
  AccountDetails,
  Name,
  Detail,
  Form,
  Input,
  Button,
} from "./Account.style";
import Spinner from "utils/spinner";
import { ReactComponent as Pencil } from "assets/pencil.svg";

const Account = () => {
  const context = useWeb3React<Web3Provider>();
  const { active, account, chainId } = context;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [box, setBox] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      let mounted = true;
      if (active) {
        if (mounted) {
          const profile = await Box.getProfile(account);
          setName(profile.name);
          const boxProvider = await Box.get3idConnectProvider();
          const box = await Box.openBox(account, boxProvider);
          setBox(box);
          await box.syncDone;
          const email = await (box as any).private.get("email");
          console.log("email:", email);
          setEmail(email);
        }
      }
      return () => (mounted = false);
    })();
  }, [active, account]);

  const handeSubmit = async (e: any) => {
    e.preventDefault();
    await (box as any).private.set("email", newEmail);
  };

  return (
    <Container>
      <Content>
        <Border>
          <Top>
            <Title>Account</Title>
          </Top>
          {active && (
            <Wrapper>
              <AccountDetails>
                <Name>{name}</Name>
                <Detail>{account}</Detail>
                <Detail>{email}</Detail>
              </AccountDetails>

              {box ? (
                <Form onSubmit={handeSubmit}>
                  <Input
                    type="email"
                    value={newEmail}
                    placeholder={email}
                    onChange={(e: any) => setNewEmail(e.target.value)}
                  />
                  <Button disabled={!box}>
                    <Pencil />
                  </Button>
                </Form>
              ) : (
                <Spinner />
              )}
            </Wrapper>
          )}
        </Border>
      </Content>
    </Container>
  );
};

export default Account;
