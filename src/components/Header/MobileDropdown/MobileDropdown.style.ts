import styled from "styled-components";
import { NavLink } from "react-router-dom";

interface IProps {
  isExpanded?: boolean;
}

export const Wrapper = styled.nav<IProps>`
  height: auto;
  width: 100%;
  position: absolute;
  background: ${(props) => props.theme.palette3.white};
  z-index: 100;
  display: ${(props) => (props.isExpanded ? "block" : "none")};
  @media (min-width: 800px) {
    display: none;
  }
`;

export const List = styled.ul`
  margin: 0;
  padding: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.8);
`;

export const Item = styled.li`
  list-style: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.palette3.black};
  font-weight: 500;
  height: 3rem;
  padding: 0 1rem;
  &:hover {
    color: ${(props) => props.theme.palette3.red};
  }
`;

export const StyledLink = styled(NavLink)`
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
`;
