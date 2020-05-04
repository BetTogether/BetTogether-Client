import styled from "styled-components";

export const Wrapper = styled.div<{ isOpen: boolean }>`
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  padding: 16px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  z-index: 9999;
`;

export const Modal = styled.div`
  background-color: white;
  border-radius: 4px;
  height: auto;
  max-height: calc(100vh - 50px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  max-width: 500px;
  min-height: 1rem;
  min-width: 1rem;
  border: 1px solid #eee;
  padding: 32px;
  position: relative;
  width: 100%;
`;

export const Container = styled.div`
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  width: 400px;
  padding: 30px 40px;
  text-align: center;
  margin: 10px;
  max-height: 175px;
`;

export const Image = styled.img`
  margin-left: 1rem;
  height: 7.5rem;
  width: 35rem;
`;

export const Asset = styled.div`
  color: #777;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled.img`
  height: 3rem;
  width: 3rem;
`;

export const Form = styled.form`
  display: flex;
  justify-content: space-evenly;
`;

export const Label = styled.label`
  color: #777;
  display: block;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  color: #777;
  border: 2px solid #f0f0f0;
  border-radius: 4px;
  display: block;
  padding: 10px;
  font-size: 14px;
  &:focus {
    outline: 0;
    border-color: #777;
  }
`;

export const Button = styled.button`
  cursor: pointer;
  color: white;
  background-color: #ff007a;
  border: 2px solid #ff007a;
  border-radius: 3px;
  font-size: 16px;
  padding: 10px;
  font-weight: 600;
  &:hover {
    transition: 1s;
    background-color: #b30055;
    border: 2px solid #b30055;
  }
  &:focus {
    outline: 0;
  }
  &:disabled {
    cursor: not-allowed;
    background-color: #ffb3d7;
    border: 2px solid #ffb3d7;
  }
`;

export const IconButton = styled.button`
  height: 40px;
  width: 40px;
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

export const Small = styled.small`
  color: #777;
  display: block;
  margin-top: 5px;
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

export const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
  color: gray;
`;

export const SVG = styled.svg`
  height: 1.5rem;
  width: 1.5rem;
  fill: currentColor;
  color: #edf2f7;
  margin-right: 0.5rem;
`;
