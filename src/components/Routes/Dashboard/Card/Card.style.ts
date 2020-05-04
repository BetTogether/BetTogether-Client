import styled from "styled-components";

export const Content = styled.div`
  background-color: ${(props) => props.theme.palette3.gray};
  border-radius: 0.5rem;
  margin: 0 3rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

export const Header = styled.div`
  align-items: center;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  padding: 13px 18px;
  border-bottom: 1px solid ${(props) => props.theme.palette3.black};
`;

export const ID = styled.h4`
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: left;
  text-transform: uppercase;
`;

export const Question = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem;
  font-size: 3rem;
`;

export const MarketContent = styled.div`
  padding: 1rem;
`;

export const Section = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MarketAmount = styled.h3`
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

export const Form = styled.form`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid ${(props) => props.theme.palette3.gray};
  border-radius: 0.5rem 0 0 0.5rem;
`;

export const BuyTicket = styled.button`
  color: ${(props) => props.theme.palette3.white};
  background-color: ${(props) => props.theme.palette3.red};
  padding: 0.5rem 1.5rem;
  border-radius: 0 0.5rem 0.5rem 0;
  &:focus {
    outline: none;
  }
`;

export const DaiLabel = styled.label<{ isChecked?: boolean }>`
  margin: 0 0 0.6rem;
  display: block;
  width: 8rem;
  height: 1.2rem;
  border-radius: 2rem;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  :after {
    content: "";
    position: absolute;
    top: 50%;
    transform: translate(40%, -40%);
    background-color: ${(props) => (props.isChecked ? "#AA073F" : "white")};
    width: 2.1em;
    height: 2.1em;
    border-radius: 50%;
    transition: all 0.3s ease;
    left: ${(props) => (props.isChecked ? "45%" : "10%")};
    box-shadow: 1px 1px 10px #ccc;
  }
`;

export const DaiChildLabel = styled.div<{ isChecked?: boolean }>`
  width: 50%;
  height: 1.5rem;
  margin: 0 auto;
  border-radius: 1.5rem;
  background-color: ${(props) => (props.isChecked ? "grey" : "white")};
  transition: all 0.6s ease;
  opacity: 0.6;
`;

export const DaiInput = styled.input`
  display: none;
`;

export const OwnerButtons = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const OwnerButton = styled.button`
  background-color: ${(props) => props.theme.palette3.black};
  border: none;
  color: ${(props) => props.theme.palette3.white};
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  &:hover {
    background-color: ${(props) => props.theme.palette3.red};
  }
`;
