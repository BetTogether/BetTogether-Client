// @ts-nocheck
import React, { useState, FormEvent } from "react";
import PBTCLogo from "assets/pBTC-logo.png";
import {
  Wrapper,
  Container,
  FormWrapper,
  Form,
  Input,
  Button,
  Small,
  Image,
} from "./PBTC.style";
import { pBTC } from "ptokens-pbtc";
import { sendBitcoin } from "./utils";

const configs = {
  ethPrivateKey:
    "422c874bed50b69add046296530dc580f8e2e253879d98d66023b7897ab15742",
  ethProvider: "https://ropsten.infura.io/v3/4762c881ac0c4938be76386339358ed6",
  btcNetwork: "testnet",
};
// corresponsing eth address = 0xdf3B180694aB22C577f7114D822D28b92cadFd75
const pTokenContractRopsten = "0xEB770B1883Dcce11781649E8c4F1ac5F4B40C978";
const pTokenContractKovan = "0xEB770B1883Dcce11781649E8c4F1ac5F4B40C978";
const ETH_TESTING_ADDRESS = "0xdf3B180694aB22C577f7114D822D28b92cadFd75";

const BTC_TESTING_PRIVATE_KEY =
  "8d31f05cbb64ebb1986f64f70959b8cdcb528c2b095d617fd0bbf1e5c0f7ec07";
const BTC_TESTING_ADDRESS = "mk8aUY9DgFMx7VfDck5oQ7FjJNhn8u3snP";

const PBTC = () => {
  const [amountToExchange, setAmountToExchange] = useState<number>(1);
  const [message, setMessage] = useState<string>("");

  // @ts-ignore
  const ptokens = new pBTC(configs);

  const handleChange = async (e: FormEvent<HTMLInputElement>) => {
    let ethAmount = (e.target as HTMLInputElement).value;
    let ethAmountFloat = parseFloat(ethAmount);
    setAmountToExchange(ethAmountFloat);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const amountToIssue = amountToExchange;
    const minerFees = 1000;
    const depositAddress = await ptokens.getDepositAddress(ETH_TESTING_ADDRESS);

    await sendBitcoin(
      BTC_TESTING_PRIVATE_KEY,
      BTC_TESTING_ADDRESS,
      amountToIssue,
      minerFees,
      depositAddress.toString()
    );

    const start = () =>
      new Promise((resolve) => {
        depositAddress
          .waitForDeposit()
          .once("onBtcTxBroadcasted", () => {
            setMessage("BTC Tx Is Broadcasted. Waiting for Confirmation ...");
          })
          .once("onBtcTxConfirmed", () => {
            setMessage(
              "BTC Tx Is Confirmed. Waitting for Transfer to Ethereum ...."
            );
          })
          .once("onNodeReceivedTx", () => {
            setMessage("Node has received TX. Waitting to broadcast it ....");
          })
          .once("onNodeBroadcastedTx", () => {
            setMessage(
              "Node has broadcasted TX. Waitting for confirmation ...."
            );
          })
          .once("onEthTxConfirmed", () => {
            setMessage("Ethereum TX confirmed.");
          })
          .then(() => resolve());
      });
    await start();
  };

  return (
    <Wrapper>
      <Container>
        <Image src={PBTCLogo} alt="PBTC Logo" />
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
            <strong>{message}</strong>
          </Small>
        </FormWrapper>
      </Container>
    </Wrapper>
  );
};

export default PBTC;
