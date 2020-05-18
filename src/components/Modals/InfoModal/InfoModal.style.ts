import styled from "styled-components";

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
  flex-direction: column;
  text-align: left;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Detail = styled.h3`
  font-size: 1.8rem;
  font-weight: 400;
  line-height: 2rem;
  margin: 0;
  padding: 0;
`;

export const ItemDescription = styled.p`
  color: #555;
  font-size: 12px;
  line-height: 1.5;
  margin: 0 0 10px;
  padding: 0;
`;
