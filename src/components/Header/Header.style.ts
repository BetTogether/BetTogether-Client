import styled from "styled-components";
import ConnectionBanner from "@rimble/connection-banner";

export const NetworkNotification = styled(ConnectionBanner)`
  background-color: #fbe9e7;
  border: 1px solid #dc2c10;
  border-radius: 4px;
  color: #841a09;
  padding: 1rem;
  position: relative;
  width: 100%;
`;

export const Head = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-height: 4.5rem;
  margin: 0 auto;
  padding: 0.75rem 1.25rem;
  background-color: ${(props) => props.theme.palette3.black};
`;

export const Logo = styled.h1`
  cursor: pointer;
  color: ${(props) => props.theme.palette3.white};
`;

export const GitHubLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;
  margin-right: 1rem;
  cursor: pointer;
  svg {
    color: white;
    fill: white;
  }
`;

export const RightContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;

export const ExpandButton = styled.button`
  border: none;
  background: none;
  border-style: none;
  outline: none;
  border-radius: 0rem;
  cursor: pointer;
  font-size: 100%;
  margin: 0;
  padding: 0.625rem;
  @media (min-width: 800px) {
    display: none;
  }
`;

export const ConnectionButton = styled.button`
  background-color: ${(props) => props.theme.palette3.red};
  border: 1px solid ${(props) => props.theme.palette3.red};
  color: ${(props) => props.theme.palette3.white};
  border-radius: 4px;
  cursor: pointer;
  margin: 0;
  padding: 0.75rem 1rem;
  position: relative;
  transition: all 80ms ease-in-out;
  width: auto;
  font-size: 1.1rem;
`;

export const Address = styled.span`
  font-weight: 500;
`;
