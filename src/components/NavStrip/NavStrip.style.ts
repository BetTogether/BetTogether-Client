import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Wrapper = styled.div`
  display: none;
  @media (min-width: 800px) {
    display: block;
    background-color: ${(props) => props.theme.palette3.red};
    border-bottom-width: 1px;
  }
`;

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

export const Content = styled.nav`
  display: flex;
  justify-content: center;
`;

export const Section = styled.div<{ account?: boolean }>`
  display: flex;
  margin-right: ${(props) => (props.account ? "0" : "2rem")};
`;

export const StyledLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  text-decoration: none;
  color: ${(props) => props.theme.palette3.gray};
  border-bottom: 2px solid transparent;
  &:hover {
    color: ${(props) => props.theme.palette3.white};
    border-bottom: 2px solid ${(props) => props.theme.palette3.white};
  }
  &.active {
    color: ${(props) => props.theme.palette3.white};
    border-bottom: 2px solid ${(props) => props.theme.palette3.white};
  }
  cursor: pointer;
`;

export const Span = styled.span`
  margin-left: 0.25rem;
`;
