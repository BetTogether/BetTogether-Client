import React, { createContext, useReducer, Dispatch } from "react";
import { ethers } from "ethers";

import { ContractReducer } from "../Reducers";
import BTMarketFactoryContract from "abis/BTMarketFactory.json";
import IERC20 from "abis/IERC20.json";
import addresses, { KOVAN_ID } from "utils/addresses";

declare let window: any;

const factoryAddress = addresses[KOVAN_ID].marketFactory;
const daiAddress = addresses[KOVAN_ID].tokens.DAI;

const initialContractState: any = [];

const provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
const wallet = provider.getSigner();
const FactoryContract = new ethers.Contract(
  factoryAddress,
  BTMarketFactoryContract.abi,
  wallet
);

initialContractState.push(FactoryContract);

const DaiInstance: any = new ethers.Contract(daiAddress, IERC20.abi, wallet);

initialContractState.push(DaiInstance);

export const ContractContext = createContext<{
  contractState: any;
  contractDispatch: Dispatch<any>;
}>({ contractState: initialContractState, contractDispatch: () => null });

export const ContractProvider = ({ children }: any) => {
  const [contractState, contractDispatch] = useReducer<typeof ContractReducer>(
    ContractReducer,
    initialContractState
  );

  return (
    <ContractContext.Provider value={{ contractState, contractDispatch }}>
      {children}
    </ContractContext.Provider>
  );
};
