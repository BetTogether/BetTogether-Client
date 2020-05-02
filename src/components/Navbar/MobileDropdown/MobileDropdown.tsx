import React from "react";

import { Wrapper, List, Item, Link } from "./MobileDropdown.style";

interface IMobileDropdownProps {
  isExpanded?: boolean;
}

const MobileDropdown = ({ isExpanded }: IMobileDropdownProps) => {
  return (
    <Wrapper isExpanded={isExpanded}>
      <List>
        <Item>
          <Link href="#" target="_blank">
            Dashboard
          </Link>
        </Item>
        <Item>
          <Link href="#" target="_blank">
            Markets
          </Link>
        </Item>
        <Item>
          <Link href="#" target="_blank">
            Profile
          </Link>
        </Item>
        <Item>
          <Link href="#" target="_blank">
            Settings
          </Link>
        </Item>
      </List>
    </Wrapper>
  );
};

export default MobileDropdown;
