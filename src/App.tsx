import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Navbar from "./components/Navbar";

const connectWallet = () => (window as any).ethereum.enable();

function App() {
  const [activeAddress, setActiveAddress] = useState("");
  const [ethBalance, setEthBalance] = useState(0);
  const [daiBalance, setDaiBalance] = useState(0);
  const [wallet, setWallet] = useState("");

  useEffect(() => {
    (async () => {
      (window as any).ethereum.enable();
      const provider = new ethers.providers.Web3Provider(
        (window as any).web3.currentProvider
      );
      const wallet = provider.getSigner();
      //@ts-ignore
      setWallet(wallet);
      const activeAddress = await wallet.getAddress();
      setActiveAddress(activeAddress);

      const ethBalance = await wallet.getBalance();
      const format = ethers.utils.formatEther(ethBalance);
      const newv = parseFloat(format);
      let newx = +newv.toFixed(4);
      setEthBalance(newx);
    })();
  }, []);

  return (
    <>
      <Navbar
        activeAddress={activeAddress}
        connectWallet={connectWallet}
        ethBalance={ethBalance}
        daiBalance={daiBalance}
      />
    </>
  );
}

export default App;
