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
import { useNetworkId } from "utils/hooks";

function App() {
  const { active } = useWeb3React<Web3Provider>();
  const [painted, setPainted] = useState(false);
  const [networkId, setNetwork] = useState<number>();

  useNetworkId().then((networkId) => {
    let chainId = networkId.chainId;
    setNetwork(chainId);
  });

  useEffect(() => {
    setPainted(true);
  }, []);

  return !painted ? null : !networkId ? null : (
    <>
      <Header />
      {networkId !== 42 ? (
        <ConnectionBanner currentNetwork={networkId} requiredNetwork={42} />
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
