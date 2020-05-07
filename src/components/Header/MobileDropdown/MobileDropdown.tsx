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
          <StyledLink to="/reporting" onClick={() => setIsExpanded(false)}>
            Reporting
          </StyledLink>
        </Item>
        <Item>
          <StyledLink to="/settings" onClick={() => setIsExpanded(false)}>
            Settings
          </StyledLink>
        </Item>
      </List>
    </Wrapper>
  );
};

export default MobileDropdown;
