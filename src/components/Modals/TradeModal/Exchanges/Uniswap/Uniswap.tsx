import React, { useState, useEffect, FormEvent } from "react";
import UniswapLogo from "assets/uniswap.svg";
import {
  Wrapper,
  Container,
  FormWrapper,
  Form,
  Input,
  Button,
  Small,
  Image,
} from "./Uniswap.style";
import {
  ChainId,
  Token,
  TokenAmount,
  Pair,
  Route,
  TradeType,
  Trade,
} from "@uniswap/sdk";
import { useWeb3Context } from "web3-react";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

const Uniswap = () => {
  const context = useWeb3React<Web3Provider>();
  const { active, account, chainId } = context;

  const [amountToExchange, setAmountToExchange] = useState<number>(0);
  const [potentialDai, setPotentialDai] = useState<number>(0);

  const DAI = new Token(
    ChainId.KOVAN,
    "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa",
    18,
    "DAI"
  );

  const WETH = new Token(
    ChainId.KOVAN,
    "0xd0a1e359811322d97991e03f863a0c30c2cf029c",
    18,
    "WETH"
  );

  const WETH_AMOUNT = "2000000000000000000";
  const DAI_AMOUNT = "1000000000000000000";

  const DAI_WETH = new Pair(
    new TokenAmount(DAI, DAI_AMOUNT),
    new TokenAmount(WETH, WETH_AMOUNT)
  );

  const WETH_TO_DAI = new Route([DAI_WETH], WETH);

  const handleChange = async (e: FormEvent<HTMLInputElement>) => {
    let ethAmount = (e.target as HTMLInputElement).value;
    let ethAmountFloat = parseFloat(ethAmount);
    setAmountToExchange(ethAmountFloat);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log("handleSubmit:");

    console.log("WETH_TO_DAI:", WETH_TO_DAI);
    console.log("WETH:", WETH);
    e.preventDefault();
    const TRADE = new Trade(
      WETH_TO_DAI,
      new TokenAmount(WETH, "1000000000000000"),
      TradeType.EXACT_INPUT
    );

    console.log("TRADE:", TRADE);
  };

  return (
    <Wrapper>
      <Container>
        <Image src={UniswapLogo} alt="Uniswap Logo" />
        <FormWrapper>
          <Form onSubmit={handleSubmit}>
            <Input
              type="number"
              required
              placeholder="0"
              value={amountToExchange}
              onChange={handleChange}
              onKeyDown={(e: any) =>
                (e.key === "e" && e.preventDefault()) ||
                (e.key === "+" && e.preventDefault()) ||
                (e.key === "-" && e.preventDefault())
              }
            />
            <Button disabled={amountToExchange <= 0}>Exchange</Button>
          </Form>
          <Small>
            This will give you ~ <strong>{potentialDai}</strong> Dai
          </Small>
        </FormWrapper>
      </Container>
    </Wrapper>
  );
};

export default Uniswap;
