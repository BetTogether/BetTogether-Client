import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Header from "./components/Header";
import NavStrip from "./components/NavStrip";
import Dashboard from "./components/Routes/Dashboard";
import Markets from "./components/Routes/Markets";
import Account from "./components/Routes/Account";
import NotFound from "./components/Routes/NotFound";
import { ModalProvider } from "./store/Context";
import ModalContainer from "./components/Modals/Modals.container";

function App() {
  return (
    // <ContractProvider>
    <ModalProvider>
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
        <Route path="/account">
          <Account />
        </Route>
        <Route component={NotFound} />
      </Switch>
      <ModalContainer />
    </ModalProvider>
    // </ContractProvider>
  );
}

export default App;
