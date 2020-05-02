import React from "react";
import styled from "styled-components";

const Hamburger = () => (
  <path
    fill="#f1404b"
    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
  />
);

const X = () => (
  <path
    fill="#f1404b"
    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
  />
);

export const SVG = styled.svg`
  height: 1.25rem;
  width: 1.25rem;
`;

interface IMenuIcon {
  isExpanded: boolean;
}

const MenuIcon = ({ isExpanded }: IMenuIcon) => {
  const icon = isExpanded ? <X /> : <Hamburger />;

  return <SVG viewBox="0 0 24 24">{icon}</SVG>;
};

export default MenuIcon;
