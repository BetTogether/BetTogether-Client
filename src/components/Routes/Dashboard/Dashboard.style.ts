import styled from "styled-components";

export const Content = styled.div`
  background-color: ${(props) => props.theme.palette3.white};
  border-top-width: 1px;
  border-bottom-width: 1px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  @media (max-width: 800px) {
    border-radius: 0.25rem;
  }
  padding-bottom: 1rem;
`;

export const Top = styled.div`
  display: flex;
  margin-bottom: -1px;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
`;

export const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${(props) => props.theme.palette3.black};
`;

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto 1rem;
  max-width: 100%;
  padding: 0rem 1rem;
`;

export const Button = styled.button`
  background-color: ${(props) => props.theme.palette3.black};
  border: none;
  color: ${(props) => props.theme.palette3.white};
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.palette3.red};
  }
`;

export const GetDaiButton = styled.button`
  position: fixed;
  cursor: pointer;
  bottom: 0;
  right: 0;
  margin: 2rem;
  padding: 1rem;
  border-radius: 0.25rem;
  display: inline-flex;
  align-items: center;
  font-weight: 700;
  background-color: ${(props) => props.theme.palette3.red};
  &:focus {
    outline: none;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  max-width: 100%;
`;

export const CreateMarketButton = styled.button`
  background-color: ${(props) => props.theme.palette3.black};
  border: none;
  border-radius: 0.33rem;
  color: ${(props) => props.theme.palette3.white};
  text-align: center;
  text-decoration: none;
  font-size: 1rem;
  padding: 0.8rem;
  width: auto;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.palette3.red};
  }
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

export const CheckBoxLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

export const IconStyled = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
`;
