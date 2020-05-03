import React, { useState, useEffect } from "react";

import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import styled from "styled-components";
import ConnectionBanner from "@rimble/connection-banner";
import Dashboard from "./components/Routes/Dashboard";
import Account from "./components/Routes/Account";
import Markets from "./components/Routes/Markets";
import Settings from "./components/Routes/Settings";
import NotFound from "./components/Routes/NotFound";
import Web3Provider from "web3-react";
import { ethers } from "ethers";
import connectors from "./utils/connectors";
import { LayoutProvider } from "./store/context/LayoutContext";
import TxModalContainer from "./components/Modals/TxModals.container";

const NetworkNotification = styled(ConnectionBanner)`
  background-color: #fbe9e7;
  border: 1px solid #dc2c10;
  border-radius: 4px;
  color: #841a09;
  padding: 1rem;
  position: relative;
  width: 100%;
`;

function App() {
  const enableWallet = () => {
    (window as any).ethereum.enable();
  };

  const disableWallet = () => {
    // (context.active || (context.error && context.connectorName)) && (
    //   <button onClick={() => context.unsetConnector()}>
    //     {context.active ? "Deactivate Connector" : "Reset"}
    //   </button>
    // );
  };
  return (
    <Web3Provider
      connectors={connectors}
      libraryName={"ethers.js"}
      web3Api={ethers}
    >
      <LayoutProvider>
        {/* {networkId !== 4 && (
        <NetworkNotification currentNetwork={networkId} requiredNetwork={4} />
      )} */}
        <Navbar />
        {/* <Switch>
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
      <h1>{ethBalance}</h1> */}
        <TxModalContainer />
      </LayoutProvider>
    </Web3Provider>
  );
}

export default App;
