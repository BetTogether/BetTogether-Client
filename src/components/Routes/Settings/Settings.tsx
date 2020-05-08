import React, { useState, useEffect } from "react";
import { Content, Border, Top, Title } from "./Settings.style";
import Container from "components/Routes/RoutesContainer";
import { useWeb3Context } from "web3-react";
const Box = require("3box");

const Settings = () => {
  const context = useWeb3Context();
  const { active, account } = context;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [box, setBox] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [imageLink, setImageLink] = useState("");

  useEffect(() => {
    (async () => {
      if (active) {
        const profile = await Box.getProfile(account);
        setName(profile.name);

        if (profile.image) {
          let imageLink = profile.image[0]["contentUrl"]["/"];
          let newLink = `https://ipfs.infura.io/ipfs/${imageLink}`;
          setImageLink(newLink);
          const boxProvider = await Box.get3idConnectProvider();
          const box = await Box.openBox(account, boxProvider);
          setBox(box);
          await box.syncDone;
          const email = await (box as any).private.get("email");
          setEmail(email);
        }
      }
    })();
  }, [active]);

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
          {imageLink && <img src={imageLink} alt="profile picture" />}

          <h1>{name}</h1>
          <h1>{email}</h1>
          {box && (
            <form onSubmit={handeSubmit}>
              <input
                type="string"
                value={newEmail}
                placeholder={"email"}
                onChange={(e: any) => setNewEmail(e.target.value)}
              />
              <button>Change email</button>
            </form>
          )}
        </Border>
      </Content>
    </Container>
  );
};

export default Settings;
