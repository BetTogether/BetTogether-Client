import React, { useState, useEffect, FormEvent } from "react";
import styled from "styled-components";
import { useWeb3Context } from "web3-react";
import { ethers } from "ethers";
import { KyberNetworkProxyABI } from "contracts/KyberNetworkProxyABI";
import KyberLogo from "assets/images/kyber.svg";

const Container = styled.div`
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  width: 400px;
  padding: 30px 40px;
  text-align: center;
  margin: 10px;
  max-height: 175px;
  /* display: flex; */
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

const Kyber = () => {
  const context = useWeb3Context();
  const [activeAccount, setActiveAccount] = useState<string | null | undefined>(
    ""
  );
  const [amountEthToExchange, setAmountEthToExchange] = useState<number>(0);
  const [potentialDai, setPotentialDai] = useState(0);
  const provider = ethers.getDefaultProvider();
  const ETH_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  const DAI_ADDRESS = "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa";
  const KyberNetworkProxyAddress = "0x692f391bCc85cefCe8C237C01e1f636BbD70EA4D";
  const KyberNetworkProxyInstance = new ethers.Contract(
    KyberNetworkProxyAddress,
    KyberNetworkProxyABI,
    provider
  );

  useEffect(() => {
    if (context.active) {
      setActiveAccount(context.account);
    }
  }, [context.account, context.active]);

  const handleChange = async (e: FormEvent<HTMLInputElement>) => {
    try {
      let amount = e.currentTarget.value;
      let convert = parseFloat(amount);
      setAmountEthToExchange(convert);
      const ETH_QTY_WEI = await ethers.utils.formatUnits(
        convert.toString(),
        18
      );
      let rate = await KyberNetworkProxyInstance.methods
        .getExpectedRate(ETH_ADDRESS, DAI_ADDRESS, ETH_QTY_WEI)
        .call();
      let expectedRate = rate.expectedRate / 1000000000000000000;
      console.log(expectedRate);

      let slippageRate = rate.slippageRate / 1000000000000000000;
      setPotentialDai(slippageRate);
    } catch (error) {
      console.log("error:", error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const minConversionRate = "1"; //!HARD CODED
      const ethWeiAmt = ethers.utils.formatUnits(
        amountEthToExchange.toString(),
        18
      );
      let transactionData = KyberNetworkProxyInstance.methods
        .swapEtherToToken(DAI_ADDRESS, minConversionRate)
        .encodeABI();
      // if (activeAccount) {
      //   await provider.sendTransaction({
      //     from: activeAccount,
      //     to: KyberNetworkProxyAddress,
      //     data: transactionData,
      //     value: ethWeiAmt,
      //     // gasLimit: web3.utils.toHex(5000000),
      //     // gasPrice: web3.utils.toHex(10000000000),
      //   });
      // }
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <Container>
      <Image src={KyberLogo} alt="Kyber Logo" />
      <Form onSubmit={handleSubmit}>
        <Input
          id="ethForDai"
          aria-label="Exchange"
          type="number"
          required
          value={amountEthToExchange}
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) =>
            (e.key === "e" && e.preventDefault()) ||
            (e.key === "+" && e.preventDefault()) ||
            (e.key === "-" && e.preventDefault())
          }
        />
        <Button disabled={amountEthToExchange <= 0}>Exchange</Button>
      </Form>
      <Small>
        1 ETH will equate to roughly <strong>{potentialDai}</strong> Dai
      </Small>
    </Container>
  );
};

export default Kyber;
