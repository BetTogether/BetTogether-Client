import React, { useState, FormEvent } from "react";
import styled from "styled-components";
import { UniswapV2Router01ABI } from "contracts/UniswapV2Router01";
import { useWeb3Context } from "web3-react";
import { ethers } from "ethers";
import UniswapLogo from "assets/images/uniswap.svg";

const Container = styled.div`
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  width: 400px;
  padding: 30px 40px;
  text-align: center;
  margin: 10px;
  max-height: 175px;
`;

const Form = styled.form`
  display: flex;
  justify-content: space-evenly;
`;

const Input = styled.input`
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

const Button = styled.button`
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

const Small = styled.small`
  color: #777;
  display: block;
  margin-top: 5px;
`;

const Image = styled.img`
  height: 3.75rem;
  width: 17.5rem;
  margin-bottom: 1rem;
`;

const Uniswap = () => {
  const context = useWeb3Context();
  const [activeAccount, setActiveAccount] = useState<string | null | undefined>(
    ""
  );
  const [amountEthToExchange, setAmountEthToExchange] = useState<number>(0);
  const [potentialDai, setPotentialDai] = useState(0);
  const handleChange = async (e: FormEvent<HTMLInputElement>) => {};

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {};

  return (
    <Container>
      <Image src={UniswapLogo} alt="Uniswap Logo" />
      <Form onSubmit={handleSubmit}>
        <Input
          id="ethForDai"
          aria-label="Exchange"
          type="number"
          required
          value={amountEthToExchange}
          onChange={handleChange}
          onKeyDown={(e) =>
            (e.key === "e" && e.preventDefault()) ||
            (e.key === "+" && e.preventDefault()) ||
            (e.key === "-" && e.preventDefault())
          }
        />
        <Button disabled={amountEthToExchange <= 0}>Exchange</Button>
      </Form>
      <Small>
        This will give you ~ <strong>{potentialDai}</strong> Dai
      </Small>
    </Container>
  );
};

export default Uniswap;
