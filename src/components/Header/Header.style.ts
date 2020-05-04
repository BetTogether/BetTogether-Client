import styled from "styled-components";
import { NavLink } from "react-router-dom";
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
  max-height: 5rem; //70px
  margin: 0 auto;
  padding: 12px 20px;
  z-index: 10;
  color: ${(props) => props.theme.palette3.red};
  background-color: ${(props) => props.theme.palette3.black};
  @media (min-width: 600px) {
    justify-content: left;
  }
`;

export const Logo = styled.img`
  cursor: pointer;
  width: 100px;
  margin-right: 1rem;
`;

export const StyledLink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.palette3.black};
  cursor: pointer;
  height: 72px;
  margin-right: 32px;
  position: relative;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.palette3.red};
  }
  &:active {
    color: ${(props) => props.theme.palette3.red};
  }
  @media (max-width: 800px) {
    display: none;
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.6;
  transition: color 80ms ease-in-out;
`;

export const RightContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;

export const AddressWrapper = styled.button`
  background-color: ${(props) => props.theme.palette3.red};
  border: 1px solid ${(props) => props.theme.palette3.red};
  border-radius: 4px;
  color: ${(props) => props.theme.palette3.white};
  cursor: pointer;
  margin: 0;
  min-width: 120px;
  padding: 12px 16px;
  position: relative;
  transition: all 80ms ease-in-out;
  width: auto;
  font-size: 1.1rem;
  margin: 0;
`;

export const Address = styled.span`
  font-weight: 500;
`;

export const ExpandButton = styled.button`
  border-radius: 0rem;
  border-style: none;
  border: none;
  background: none;
  cursor: pointer;
  display: block;
  font-size: 100%;
  left: 0.375rem;
  line-height: 1.15;
  margin: 0;
  outline: none;
  padding: 0.625rem;
  top: 0.375rem;
  z-index: 30;
  @media (min-width: 800px) {
    display: none;
  }
`;

export const IconLink = styled.a`
  height: 40px;
  width: 40px;
  border: none;
  background: none;
  display: flex;
  cursor: pointer;
  &:hover {
    svg {
      transform: scale(1.3);
    }
  }
  svg {
    outline: none;
    transition: transform 0.15s linear;
  }
`;

export const ConnectButton = styled.button`
  color: ${(props) => props.theme.palette3.white};
  padding: 1rem;
  border-radius: 0.25rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  &:hover {
    background-color: ${(props) => props.theme.palette3.gray};
  }
  &:focus {
    outline: none;
  }
`;