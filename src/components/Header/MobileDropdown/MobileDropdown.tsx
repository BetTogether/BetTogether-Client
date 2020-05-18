import React from "react";
import { Wrapper, List, Item, StyledLink } from "./MobileDropdown.style";

interface IMobileDropdownProps {
  isExpanded: boolean;
  setIsExpanded: any;
}

const MobileDropdown = ({
  isExpanded,
  setIsExpanded,
}: IMobileDropdownProps) => {
  return (
    <Wrapper isExpanded={isExpanded}>
      <List>
        <Item>
          <StyledLink to="/dashboard" onClick={() => setIsExpanded(false)}>
            Dashboard
          </StyledLink>
        </Item>
        <Item>
          <StyledLink to="/markets" onClick={() => setIsExpanded(false)}>
            Markets
          </StyledLink>
        </Item>
        <Item>
          <StyledLink to="/account" onClick={() => setIsExpanded(false)}>
            Account
          </StyledLink>
        </Item>
      </List>
    </Wrapper>
  );
};

export default MobileDropdown;
