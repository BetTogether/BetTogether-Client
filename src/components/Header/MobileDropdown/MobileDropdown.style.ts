import styled from "styled-components";
import { NavLink } from "react-router-dom";

interface IProps {
  isExpanded?: boolean;
}

export const Wrapper = styled.nav<IProps>`
  border-top: 1px solid ${(props) => props.theme.palette3.gray};
  height: auto;
  width: 100%;
  background: ${(props) => props.theme.palette3.white};
  position: absolute;
  display: ${(props) => (props.isExpanded ? "block" : "none")};
  z-index: 100;
`;

export const List = styled.ul`
  margin: 0;
  padding: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

export const Item = styled.li`
  list-style: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.palette3.black};
  font-weight: 500;
  height: 48px;
  padding: 0 16px;
  &:hover {
    color: ${(props) => props.theme.palette3.red};
  }
`;

export const StyledLink = styled(NavLink)`
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
`;
