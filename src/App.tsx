import React, { useState, useEffect } from "react";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import { Switch, Route, Redirect } from "react-router-dom";
import { ethers } from "ethers";

import Header from "./components/Header";
import NavStrip from "./components/NavStrip";
import Dashboard from "./components/Routes/Dashboard";
import Reporting from "./components/Routes/Reporting";
import Markets from "./components/Routes/Markets";
import Settings from "./components/Routes/Settings";
import NotFound from "./components/Routes/NotFound";
import { LayoutProvider } from "./store/Context";
import ModalContainer from "./components/Modals/Modals.container";
// import connectors from "./utils/connectors";
import { injected, portis } from "./utils/connectors";
import { useEagerConnect, useInactiveListener } from "./utils/hooks";

const connectorsByName: { [name: string]: AbstractConnector } = {
  Injected: injected,
  Portis: portis,
};

function App() {
  const context = useWeb3React<Web3Provider>();

  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState<
    AbstractConnector
  >();

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector)
      setActivatingConnector(undefined);
  }, [activatingConnector, connector]);

  const triedEager = useEagerConnect();

  useInactiveListener(!triedEager || !!activatingConnector);

  return (
    <LayoutProvider>
      <Header />
      <NavStrip />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/markets">
          <Markets />
        </Route>
        <Route path="/reporting">
          <Reporting />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route component={NotFound} />
      </Switch>
      <ModalContainer />
    </LayoutProvider>
  );
}

export default App;
