import styled from "styled-components";

export const Content = styled.div`
  background-color: white;
  border-top-width: 1px;
  border-bottom-width: 1px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  @media (max-width: 640px) {
    border-radius: 0.25rem;
  }
  padding-bottom: 1rem;
`;

export const Border = styled.div`
  border-bottom-width: 1px;
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
`;

export const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${(props) => props.theme.palette3.black};
`;

export const Image = styled.img`
  display: inline-block;
  border: 0.5rem solid ${(props) => props.theme.palette3.white};
  width: 100px;
  height: 100px;
  border-radius: 50%;
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

export const AccountDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 0 0.75rem;
`;

export const Name = styled.h2`
  display: flex;
  justify-content: flex-start;
  color: ${(props) => props.theme.palette3.red};
  font-size: 1.4rem;
  font-weight: 800;
  margin: 0;
  white-space: nowrap;
`;

export const Detail = styled.p`
  color: ${(props) => props.theme.palette3.gray};
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.2rem;
  list-style: none;
  margin: 0;
  text-align: left;
  text-decoration: none;
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
`;

export const Input = styled.input``;

export const Button = styled.button`
  border: none;
  border-radius: 50%;
  color: white;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  outline: none;
  box-shadow: none;
  &:hover {
    background-color: ${(props) => props.theme.palette3.gray};
    transition-delay: 1s;
    outline: none;
    box-shadow: none;
  }
`;

export const ThreeBoxLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  outline: none;
  box-shadow: none;
  background-color: ${(props) => props.theme.palette3.gray};
  width: 20rem;
  &:hover {
    background-color: ${(props) => props.theme.palette3.white};
  }
`;

export const LogoImage = styled.img`
  height: 6rem;
  width: 6rem;
`;

export const ThreeBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
