import React from "react";
import { Content, Border, Top, Title } from "./Reporting.style";
import Container from "components/Routes/RoutesContainer";

const Reporting = () => {
  return (
    <Container>
      <Content>
        <Border>
          <Top>
            <Title>Reporting</Title>
          </Top>
        </Border>
      </Content>
    </Container>
  );
};

export default Reporting;
