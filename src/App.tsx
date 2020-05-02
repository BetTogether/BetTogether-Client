import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ethers } from "ethers";
import Navbar from "./components/Navbar";
import styled from "styled-components";
import ConnectionBanner from "@rimble/connection-banner";
import Dashboard from "./components/Routes/Dashboard";
import Account from "./components/Routes/Account";
import Markets from "./components/Routes/Markets";
import Settings from "./components/Routes/Settings";
import NotFound from "./components/Routes/NotFound";

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
      {networkId !== 4 && (
        <NetworkNotification currentNetwork={networkId} requiredNetwork={4} />
      )}
      <Navbar activeAddress={activeAddress} connectWallet={connectWallet} />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
        <Route
          path="/dashboard"
          render={(props) => (
            <Dashboard {...props} activeAddress={activeAddress} />
          )}
        />
        <Route
          path="/markets"
          render={(props) => (
            <Markets {...props} activeAddress={activeAddress} />
          )}
        />
        <Route
          path="/account"
          render={(props) => (
            <Account {...props} activeAddress={activeAddress} />
          )}
        />
        <Route
          path="/settings"
          render={(props) => (
            <Settings {...props} activeAddress={activeAddress} />
          )}
        />
        <Route component={NotFound} />
      </Switch>
      <h1>{ethBalance}</h1>
    </>
  );
}

export default App;
