import React from "react";
import {
  Wrapper,
  Container,
  Bar,
  Section,
  StyledLink,
  Span,
} from "./NavStrip.style";
import { BsGear, BsPencilSquare, BsPerson, BsColumns } from "react-icons/bs";

const NavStrip = () => {
  return (
    <Wrapper>
      <Container>
        <Bar>
          <Section>
            <StyledLink to="/dashboard">
              <BsColumns />
              <Span>Dashboard</Span>
            </StyledLink>
          </Section>
          <Section>
            <StyledLink to="/markets">
              <BsPencilSquare />
              <Span>Markets</Span>
            </StyledLink>
          </Section>
          <Section>
            <StyledLink to="/account">
              <BsPerson />
              <Span>Account</Span>
            </StyledLink>
          </Section>
          <Section settings>
            <StyledLink to="/settings">
              <BsGear />
              <Span>Settings</Span>
            </StyledLink>
          </Section>
        </Bar>
      </Container>
    </Wrapper>
  );
};

export default NavStrip;
