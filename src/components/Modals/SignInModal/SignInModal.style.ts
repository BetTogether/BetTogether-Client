import styled from "styled-components";

export const Wrapper = styled.div<{ isOpen: boolean }>`
  background-color: rgba(0, 0, 0, 0.5);
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
  padding: 24px;
  position: relative;
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const IconButton = styled.button`
  height: 40px;
  width: 40px;
  border: none;
  outline: none;
  background: none;
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

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;

export const StyledButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px;
  color: #333;
  font-weight: 500;
  line-height: 1;
  font-size: 1.25rem;
  margin: 0.5rem 0;
  padding: 0 1rem;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: all 0.15s;
  user-select: none;
  width: 100%;
  &:hover {
    cursor: pointer;
    background-color: #f3f2f2;
    box-shadow: rgba(0, 0, 0, 0.2) 0 2px 4px;
  }
`;

export const Logo = styled.img`
  height: 3rem;
  width: 3rem;
  margin-top: 0.5rem;
`;

export const ProviderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0;
  padding: 0.5rem;
  width: 100%;
  cursor: pointer;
`;

export const ProviderContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.8rem;
  padding: 1.5rem 1rem;
  width: 100%;
  background-color: ${(props) => props.theme.palette3.white};
`;

export const ProviderTitle = styled.h1`
  color: ${(props) => props.theme.palette3.black};
  margin: 0;
`;

export const ProviderDescription = styled.small`
  color: ${(props) => props.theme.palette3.gray};
  margin-bottom: 1rem;
`;
