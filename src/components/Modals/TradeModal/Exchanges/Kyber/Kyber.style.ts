import styled from "styled-components";

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

export const Image = styled.img`
  height: 3rem;
  width: 3rem;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Form = styled.form`
  display: flex;
  justify-content: space-evenly;
`;

export const Input = styled.input`
  color: #777;
  border: 2px solid #f0f0f0;
  border-radius: 4px;
  display: block;
  padding: 0.6rem;
  font-size: 1rem;
  &:focus {
    outline: 0;
    border-color: #777;
  }
`;

export const Button = styled.button`
  cursor: pointer;
  color: ${(props) => props.theme.palette3.white};
  background-color: #00daa1;
  border: 2px solid #00daa1;
  border-radius: 3px;
  font-size: 16px;
  padding: 10px;
  font-weight: 600;
  &:hover {
    transition: 1s;
    background-color: #00b384;
    border: 2px solid #00b384;
  }
  &:focus {
    outline: 0;
  }
  &:disabled {
    cursor: not-allowed;
    background-color: #b3ffeb;
    border: 2px solid #b3ffeb;
  }
`;

export const Small = styled.small`
  color: #777;
  display: block;
  margin-top: 5px;
`;
