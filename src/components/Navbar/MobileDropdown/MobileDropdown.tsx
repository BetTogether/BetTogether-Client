import React from "react";

import { Wrapper, List, Item, StyledLink } from "./MobileDropdown.style";

interface IMobileDropdownProps {
  isExpanded?: boolean;
}

const MobileDropdown = ({ isExpanded }: IMobileDropdownProps) => {
  return (
    <Wrapper isExpanded={isExpanded}>
      <List>
        <Item>
          <StyledLink to="/dashboard">Dashboard</StyledLink>
        </Item>
        <Item>
          <StyledLink to="/markets">Markets</StyledLink>
        </Item>
        <Item>
          <StyledLink to="/account">Account</StyledLink>
        </Item>
        <Item>
          <StyledLink to="/settings">Settings</StyledLink>
        </Item>
      </List>
    </Wrapper>
  );
};

export default MobileDropdown;
