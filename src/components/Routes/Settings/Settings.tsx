import React from "react";
import { Content, Border, Top, Title } from "./Settings.style";
import Container from "components/Routes/RoutesContainer";

const Settings = () => {
  return (
    <Container>
      <Content>
        <Border>
          <Top>
            <Title>Settings</Title>
          </Top>
        </Border>
      </Content>
    </Container>
  );
};

export default Settings;
