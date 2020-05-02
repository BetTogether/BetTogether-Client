import styled from "styled-components";

interface IProps {
  isExpanded?: boolean;
}

export const Wrapper = styled.div<IProps>`
  border-top: 1px solid ${(props) => props.theme.palette3.gray};
  height: 100%;
  width: 100%;
  transform: ${(props) =>
    props.isExpanded ? "translateY(0px)" : "translateY(10px)"};
  transition: transform 250ms ease-in-out;
  background: ${(props) => props.theme.palette3.white};
  position: absolute;
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

export const Link = styled.a`
  text-transform: uppercase;
  font-weight: bold;
`;
