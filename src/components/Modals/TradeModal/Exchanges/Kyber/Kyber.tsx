import React, { useState, useEffect, FormEvent } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { KyberNetworkProxyABI } from "./KyberNetworkProxyABI";
import KyberLogo from "assets/kyber.svg";
import {
  Wrapper,
  Container,
  FormWrapper,
  Form,
  Input,
  Button,
  Small,
  Image,
} from "./Kyber.style";

const Kyber = () => {
  const context = useWeb3React<Web3Provider>();
  const { active, account } = context;
  const [amountEthToExchange, setAmountEthToExchange] = useState<number>(0);
  const [potentialDai, setPotentialDai] = useState<number>(0);
  const provider = ethers.getDefaultProvider();
  const ETH_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  const DAI_ADDRESS = "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa";
  const KyberNetworkProxyAddress = "0x692f391bCc85cefCe8C237C01e1f636BbD70EA4D";
  const KyberNetworkProxyInstance = new ethers.Contract(
    KyberNetworkProxyAddress,
    KyberNetworkProxyABI,
    provider
  );

  const handleChange = async (e: FormEvent<HTMLInputElement>) => {
    try {
      let amount = e.currentTarget.value;
      let convert = parseFloat(amount);
      setAmountEthToExchange(convert);
      const ETH_QTY_WEI = ethers.utils.formatUnits(convert.toString(), 18);
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
    <Wrapper>
      <Container>
        <Image src={KyberLogo} alt="Kyber Logo" />
        <FormWrapper>
          <Form onSubmit={handleSubmit}>
            <Input
              id="ethForDai"
              aria-label="Exchange"
              type="number"
              required
              value={amountEthToExchange}
              onChange={(e: any) => handleChange(e)}
              onKeyDown={(e: any) =>
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
        </FormWrapper>
      </Container>
    </Wrapper>
  );
};

export default Kyber;
