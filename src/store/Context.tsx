import React, {
  createContext,
  useReducer,
  Dispatch,
  useEffect,
  useState,
} from "react";
import { ethers } from "ethers";

import { ModalReducer, ContractReducer } from "./Reducers";
import BTMarketFactoryContract from "abis/BTMarketFactory.json";
import addresses, { KOVAN_ID } from "utils/addresses";

export const initialModalState: any = {
  signInModalIsOpen: false,
  tradeModalIsOpen: false,
  emailModalIsOpen: false,
  infoModalIsOpen: false,
};

export const ModalContext = createContext<{
  modalState: any;
  modalDispatch: Dispatch<any>;
}>({ modalState: initialModalState, modalDispatch: () => null });

export const ModalProvider = ({ children }: any) => {
  const [modalState, modalDispatch] = useReducer<typeof ModalReducer>(
    ModalReducer,
    initialModalState
  );

  return (
    <ModalContext.Provider value={{ modalState, modalDispatch }}>
      {children}
    </ModalContext.Provider>
  );
};

// const [factoryContract, setFactoryContract] = useState<any>(null);
// const factoryAddress = addresses[KOVAN_ID].marketFactory;

// useEffect(() => {
//   const provider = new ethers.providers.Web3Provider(
//     (window as any).web3.currentProvider
//   );
//   const wallet = provider.getSigner();

//   const FactoryContract: any = new ethers.Contract(
//     factoryAddress,
//     BTMarketFactoryContract.abi,
//     wallet
//   );

//   setFactoryContract(FactoryContract);
// }, [factoryAddress]);

// export const ContractContext = createContext<{
//   state: any;
//   dispatch: Dispatch<any>;
// }>({ state: initialState, dispatch: () => null });

// export const ContractProvider = ({ children }: any) => {
//   const [state, dispatch] = useReducer<typeof ContractReducer>(
//     ContractReducer,
//     initialState
//   );

//   return (
//     <ContractContext.Provider value={{ state, dispatch }}>
//       {children}
//     </ContractContext.Provider>
//   );
// };
