import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Routes/Dashboard";
import Account from "./components/Routes/Account";
import Markets from "./components/Routes/Markets";
import Settings from "./components/Routes/Settings";
import NotFound from "./components/Routes/NotFound";
import Web3Provider from "web3-react";
import { ethers } from "ethers";
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
        <Navbar />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/markets">
            <Markets />
          </Route>
          <Route path="/Account">
            <Account />
          </Route>
          <Route path="/markets">
            <Markets />
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
