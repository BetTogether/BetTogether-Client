import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Web3Provider from "web3-react";
import { ethers } from "ethers";
import Header from "./components/Header";
import NavStrip from "./components/NavStrip";
import Dashboard from "./components/Routes/Dashboard";
import Reporting from "./components/Routes/Reporting";
import Markets from "./components/Routes/Markets";
import Settings from "./components/Routes/Settings";
import NotFound from "./components/Routes/NotFound";
import connectors from "./utils/connectors";
import { LayoutProvider } from "./store/Context";
import ModalContainer from "./components/Modals/Modals.container";

function App() {
  return (
    <Web3Provider
      connectors={connectors}
      libraryName={"ethers.js"}
      web3Api={ethers}
    >
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
    </Web3Provider>
  );
}

export default App;
