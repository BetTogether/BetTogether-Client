import React from "react";
import styled from "styled-components";

interface IProps {
  isExpanded: boolean;
}

const SidebarMenu = styled.div<IProps>`
  height: 100%;
  position: fixed;
  left: 0;
  width: 250px;
  margin-top: 40px;
  transform: ${(props) =>
    props.isExpanded ? "translateX(0px)" : "translateX(-250px)"};
  transition: transform 250ms ease-in-out;
  background: ${(props) => props.theme.palette3.red};
`;

const SidebarMenuList = styled.ul`
  margin: 0;
  padding: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const SidebarMenuListItem = styled.li`
  list-style: none;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  padding: 20px;
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const SidebarMenuListItemSpan = styled.span`
  display: block;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
`;

const SidebarMenuListItemLink = styled.a`
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
`;

const SideBar = ({ isExpanded }: any) => {
  return (
    <SidebarMenu isExpanded={isExpanded}>
      <SidebarMenuList>
        <SidebarMenuListItem>
          BetTogether
          <SidebarMenuListItemSpan>
            Lossless Ethereum Betting
          </SidebarMenuListItemSpan>
        </SidebarMenuListItem>
        <SidebarMenuListItem>
          <SidebarMenuListItemLink href="#" target="_blank">
            Dashboard
          </SidebarMenuListItemLink>
        </SidebarMenuListItem>
        <SidebarMenuListItem>
          <SidebarMenuListItemLink href="#" target="_blank">
            Markets
          </SidebarMenuListItemLink>
        </SidebarMenuListItem>
        <SidebarMenuListItem>
          <SidebarMenuListItemLink href="#" target="_blank">
            Profile
          </SidebarMenuListItemLink>
        </SidebarMenuListItem>
        <SidebarMenuListItem>
          <SidebarMenuListItemLink href="#" target="_blank">
            Settings
          </SidebarMenuListItemLink>
        </SidebarMenuListItem>
      </SidebarMenuList>
    </SidebarMenu>
  );
};

export default SideBar;
