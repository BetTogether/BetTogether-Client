import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Navbar from "./components/Navbar";
import styled from "styled-components";

const Wrapper = styled.div`
  text-align: center;
`;

const connectWallet = async () => {
  try {
    await !(window as any).ethereum.enable();
  } catch (error) {
    console.log(error);
  }
};

function App() {
  const [activeAddress, setActiveAddress] = useState("");
  const [wallet, setWallet] = useState("");
  const [ethBalance, setEthBalance] = useState(0);
  const [daiBalance, setDaiBalance] = useState(0);

  useEffect(() => {
    (async () => {
      (window as any).ethereum.enable();
      const provider = new ethers.providers.Web3Provider(
        (window as any).web3.currentProvider
      );
      console.log("provider:", provider);
      const wallet = provider.getSigner();
      //@ts-ignore
      setWallet(wallet);
      const activeAddress = await wallet.getAddress();
      setActiveAddress(activeAddress);

      const ethBalance = await wallet.getBalance();
      console.log("ethBalance:", ethBalance);
      const format = ethers.utils.formatEther(ethBalance);
      const newv = parseFloat(format);
      let newx = +newv.toFixed(4);
      setEthBalance(newx);
    })();
  }, []);

  return (
    <Wrapper>
      <Navbar
        activeAddress={activeAddress}
        connectWallet={connectWallet}
        ethBalance={ethBalance}
        daiBalance={daiBalance}
      />
    </Wrapper>
  );
}

export default App;
