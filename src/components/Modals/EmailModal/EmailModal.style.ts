import styled, { css } from "styled-components";

export const MainWrapper = styled.div<{ isOpen: boolean }>`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  padding: 1rem;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  z-index: 9999;
`;

export const Modal = styled.div`
  background-color: ${(props) => props.theme.palette3.white};
  border-radius: 4px;
  height: auto;
  max-height: calc(100vh - 50px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  max-width: 500px;
  min-height: 1rem;
  min-width: 1rem;
  border: 1px solid #eee;
  padding: 2rem;
  position: relative;
  width: 100%;
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
`;

export const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${(props) => props.theme.palette3.black};
`;

export const IconButton = styled.button`
  height: 2.5rem;
  width: 2.5rem;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
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

export const Wrapper = styled.div`
  background-color: ${(props) => props.theme.palette3.white};
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  width: 400px;
  padding: 2rem 2.5rem;
  text-align: center;
  margin: 10px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Form = styled.form`
  display: flex;
  justify-content: space-evenly;
`;

export const Button = styled.button`
  cursor: pointer;
  color: ${(props) => props.theme.palette3.white};
  background-color: ${(props) => props.theme.palette3.red};
  border: 2px solid ${(props) => props.theme.palette3.red};
  border-radius: 3px;
  font-size: 16px;
  padding: 10px;
  font-weight: 600;
  &:focus {
    outline: 0;
  }
  &:disabled {
    cursor: not-allowed;
    background-color: gray;
    border: 2px solid gray;
  }
`;

export const Label = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

export const Input = styled.input<{ switchOn: boolean }>`
  opacity: 0;
  width: 0;
  height: 0;
  &:focus {
    box-shadow: 0 0 1px #2196f3;
  }

  ${({ switchOn }) =>
    switchOn &&
    `
    background-color: #2196f3;
    &:before {
      transform: translateX(26px);
    }
  `}
`;

export const Span = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;
  ::before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
`;
