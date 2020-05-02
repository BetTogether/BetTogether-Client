import styled, { css } from "styled-components";

export const Header = styled.header`
  display: flex;
  background-color: ${(props) => props.theme.palette3.red};
  justify-content: space-between;
  width: 100%;
  max-width: 100%;
  position: fixed;
  margin: 0 auto;
  z-index: 10;
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
`;

export const Wallet = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
  height: 100%;
  width: 100%;
`;

export const Buttons = styled.div`
  border-left: 0.0625rem solid #553580;
  display: flex;
  padding-left: 1.8rem;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  margin-right: 2rem;
  width: 1.25rem;
`;

export const ConnectWalletButton = styled.button`
  background-color: transparent;
  border: 4px solid #3ef3d4;
  border-radius: 9999px;
  color: #3ef3d4;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
  overflow: visible;
  padding: 0.5rem 1.5rem;
  pointer-events: auto;
  text-transform: none;
  transition: all 0.2s ease-out;
`;

export const IconButton = styled.button`
  height: 40px;
  width: 40px;
  border: none;
  background: none;
  cursor: pointer;
  &:focus {
    outline: 2px dashed #17171d;
  }
  &:hover {
    svg {
      transform: scale(1.3);
    }
  }
  &::-moz-focus-inner {
    border: 0;
  }
  svg {
    outline: none;
    transition: transform 0.15s linear;
  }
`;

export const WalletWrapper = styled.div`
  display: inline-flex;
  margin-right: 1rem;
`;

export const WalletContent = styled.div<{ address?: any; amount?: any }>`
  background-color: ${(props) => props.theme.primary2};
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  padding: 0.5rem 1rem 0.5rem;
  color: white;
  align-items: center;
  border-radius: 0.25rem;
  ${(props) =>
    props.address &&
    css`
      border-top-left-radius: "0.25rem";
      border-bottom-left-radius: "0.25rem";
      border-top-right-radius: "0.25rem";
      border-bottom-right-radius: "0.25rem";
    `}
`;

export const UserIcon = styled.img`
  height: 2rem;
  width: 2rem;
  color: white;
  margin: 0.5rem;
`;

export const UserSpan = styled.span`
  color: white;
  font-weight: 500;
`;

export const ConnectButton = styled.button`
  background-color: white;
  color: gray;
  padding: 1rem;
  border-radius: 0.25rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  &:hover {
    background-color: gray;
  }
  &:focus {
    outline: none;
  }
`;

export const NetworkNotification = styled.div`
  background-color: #fbe9e7;
  border: 1px solid #dc2c10;
  border-radius: 4px;
  color: #841a09;
  padding: 1rem;
  position: relative;
  width: 100%;
`;
