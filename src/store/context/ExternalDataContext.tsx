import React, { useState, createContext } from "react";

interface IContext {
  ethPrice: number;
}

const initialState = {
  ethPrice: 0,
};

const LayoutContext = createContext<{
  state: IContext;
}>({ state: initialState });

const LayoutProvider = ({ children }: any) => {
  const [state] = useState(initialState);

  return (
    <LayoutContext.Provider value={{ state }}>
      {children}
    </LayoutContext.Provider>
  );
};

export { LayoutContext, LayoutProvider };
