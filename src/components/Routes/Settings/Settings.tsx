import React, { useState, useEffect } from "react";
import { Content, Border, Top, Title, Image } from "./Settings.style";
import Container from "components/Routes/RoutesContainer";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import Box from "3box";

import Spinner from "utils/spinner";

const Settings = () => {
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
        // if (mounted) {
        //   const profile = await Box.getProfile(account);
        //   setName(profile.name);
        //   const boxProvider = await Box.get3idConnectProvider();
        //   const box = await Box.openBox(account, boxProvider);
        //   setBox(box);
        //   await box.syncDone;
        //   const email = await (box as any).private.get("email");
        //   setEmail(email);
        // }
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
            <Title>Settings</Title>
          </Top>
          {active && (
            <>
              <h3>{name}</h3>
              <h3>{account}</h3>
              <h3>{email}</h3>
              {box ? (
                <form onSubmit={handeSubmit}>
                  <input
                    type="email"
                    value={newEmail}
                    placeholder={"email"}
                    onChange={(e: any) => setNewEmail(e.target.value)}
                  />
                  <button>Change email</button>
                </form>
              ) : (
                <Spinner />
              )}
            </>
          )}
        </Border>
      </Content>
    </Container>
  );
};

export default Settings;
