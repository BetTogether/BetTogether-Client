import React from "react";
import { Content, Border, Top, Title } from "./Account.style";
import Container from "components/Routes/RoutesContainer";

const Account = () => {
  return (
    <Container>
      <Content>
        <Border>
          <Top>
            <Title>Account</Title>
          </Top>
        </Border>
      </Content>
    </Container>
  );
};

export default Account;
