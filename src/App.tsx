import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ConnectionBanner from "@rimble/connection-banner";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import Header from "./components/Header";
import NavStrip from "./components/NavStrip";
import Dashboard from "./components/Routes/Dashboard";
import Markets from "./components/Routes/Markets";
import Account from "./components/Routes/Account";
import NotFound from "./components/Routes/NotFound";
import ModalContainer from "./components/Modals/Modals.container";

function App() {
  const context = useWeb3React<Web3Provider>();
  const { connector, active, chainId } = context;

  return (
    <>
      <Header />
      {chainId !== 42 ? (
        <ConnectionBanner currentNetwork={chainId} requiredNetwork={42} />
      ) : (
        <>
          <NavStrip />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/markets">
              <Markets />
            </Route>
            <Route path="/account">
              <Account />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </>
      )}
      <ModalContainer active={active} />
    </>
  );
}

export default App;
