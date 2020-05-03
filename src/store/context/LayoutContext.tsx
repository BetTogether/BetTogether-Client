import React, { createContext, useReducer } from "react";

import LayoutReducer from "../reducers/LayoutReducer";

interface IContext {
  signInModalIsOpen: boolean;
}

const initialState = {
  signInModalIsOpen: false,
};

const LayoutContext = createContext<{
  state: IContext;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

const LayoutProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(LayoutReducer, initialState);

  return (
    <LayoutContext.Provider value={{ state, dispatch }}>
      {children}
    </LayoutContext.Provider>
  );
};

export { LayoutContext, LayoutProvider };
