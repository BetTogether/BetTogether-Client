import React, { createContext, useReducer, Dispatch } from "react";
import { providers, Contract } from "ethers";

import { ContractReducer } from "../Reducers";
import BTMarketFactoryContract from "abis/BTMarketFactory.json";
import IERC20 from "abis/IERC20.json";
import addresses, { KOVAN_ID } from "utils/addresses";
import BTMarketContract from "abis/BTMarket.json";

declare let window: any;

const factoryAddress = addresses[KOVAN_ID].marketFactory;
const daiAddress = addresses[KOVAN_ID].tokens.DAI;

const initialContractState: any = [];

const provider = new providers.Web3Provider(window.web3.currentProvider);
const wallet = provider.getSigner();
const FactoryContract = new Contract(
  factoryAddress,
  BTMarketFactoryContract.abi,
  wallet
);

initialContractState.push(FactoryContract);

const DaiInstance: any = new Contract(daiAddress, IERC20.abi, wallet);

initialContractState.push(DaiInstance);

async function getMostRecentMarket() {
  try {
    let deployedMarkets = await FactoryContract.getMarkets();
    if (deployedMarkets.length !== 0) {
      let mostRecentlyDeployedAddress =
        deployedMarkets[deployedMarkets.length - 1];
      console.log(
        "Most Recently Deployed Address:",
        mostRecentlyDeployedAddress
      );

      const marketInstance: any = new Contract(
        mostRecentlyDeployedAddress,
        BTMarketContract.abi,
        wallet
      );

      initialContractState.push(marketInstance);
    }
  } catch (error) {
    console.error(error);
  }
}

getMostRecentMarket();

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
