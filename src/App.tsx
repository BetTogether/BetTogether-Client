import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Aave from "./components/Aave";
import Navbar from "./components/Navbar";
import styled from "styled-components";
import ConnectionBanner from "@rimble/connection-banner";

const NetworkNotification = styled(ConnectionBanner)`
  background-color: #fbe9e7;
  border: 1px solid #dc2c10;
  border-radius: 4px;
  color: #841a09;
  padding: 1rem;
  position: relative;
  width: 100%;
`;

const connectWallet = () => (window as any).ethereum.enable();

function App() {
  const [activeAddress, setActiveAddress] = useState("");
  const [ethBalance, setEthBalance] = useState(0);
  const [networkId, setNetworkId] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        (window as any).ethereum.enable();
        const provider = new ethers.providers.Web3Provider(
          (window as any).web3.currentProvider
        );
        const wallet = provider.getSigner();
        const activeAddress = await wallet.getAddress();
        setActiveAddress(activeAddress);

        const ethBalance = await wallet.getBalance();
        const ethBalanceFormatted = +parseFloat(
          ethers.utils.formatEther(ethBalance)
        ).toFixed(2);
        setEthBalance(ethBalanceFormatted);

        let networkId = await provider.getNetwork();
        setNetworkId(networkId.chainId);
      } catch (error) {
        console.log("error:", error);
      }
    })();
  }, []);

  return (
    <>
      {networkId !== 42 && (
        <NetworkNotification currentNetwork={networkId} requiredNetwork={42} />
      )}
      <Navbar activeAddress={false} connectWallet={connectWallet} />
      <h1>{ethBalance}</h1>
      <Aave/>
    </>
  );
}

export default App;

// export const Backdrop = styled.div`
//   background-color: rgba(17,51,83,.6);
//   bottom: 0;
//   left: 0;
//   opacity: 1;
//   position: absolute;
//   right: 0;
//   top: 0;
//   transition: opacity .5s, z-index .5s;
//   z-index: 999;
// `
