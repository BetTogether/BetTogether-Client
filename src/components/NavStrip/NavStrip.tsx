import React from "react";
import {
  Wrapper,
  Container,
  Content,
  Section,
  StyledLink,
  Span,
} from "./NavStrip.style";
import { Dashboard, PieChart, FolderShared } from "@rimble/icons";

const NavStrip = () => {
  return (
    <Wrapper>
      <Container>
        <Content>
          <Section>
            <StyledLink to="/dashboard">
              <Dashboard />
              <Span>Dashboard</Span>
            </StyledLink>
          </Section>
          <Section>
            <StyledLink to="/markets">
              <PieChart />
              <Span>Markets</Span>
            </StyledLink>
          </Section>

          <Section account>
            <StyledLink to="/account">
              <FolderShared />
              <Span>Account</Span>
            </StyledLink>
          </Section>
        </Content>
      </Container>
    </Wrapper>
  );
};

export default NavStrip;
