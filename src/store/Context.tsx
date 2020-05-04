import React, { createContext, useReducer, Dispatch } from "react";
import { InitialStateType } from "./Types";
import { LayoutReducer } from "./Reducers";

export const initialState: InitialStateType = {
  signInModalIsOpen: false,
  tradeModalIsOpen: false,
};

export const LayoutContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

export const LayoutProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer<typeof LayoutReducer>(
    LayoutReducer,
    initialState
  );

  return (
    <LayoutContext.Provider value={{ state, dispatch }}>
      {children}
    </LayoutContext.Provider>
  );
};
