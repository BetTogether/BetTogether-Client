import { TOGGLE_SIGN_IN_MODAL, TOGGLE_TRADE_MODAL } from "./Constants";

export const toggleSignInModal = (value: boolean) => {
  return {
    type: TOGGLE_SIGN_IN_MODAL,
    value,
  };
};

export const toggleTradeModal = (value: any) => {
  return {
    type: TOGGLE_TRADE_MODAL,
    value,
  };
};
