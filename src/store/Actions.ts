import {
  TOGGLE_CREATE_MARKET_MODAL,
  TOGGLE_SIGN_IN_MODAL,
  TOGGLE_TRADE_MODAL,
  TOGGLE_EMAIL_MODAL,
  TOGGLE_INFO_MODAL,
  CREATE_MARKET_CONTRACT,
} from "./Constants";

export const toggleCreateMarketModal = (value: boolean) => {
  return {
    type: TOGGLE_CREATE_MARKET_MODAL,
    value,
  };
};

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

export const toggleEmailModal = (value: any) => {
  return {
    type: TOGGLE_EMAIL_MODAL,
    value,
  };
};

export const toggleInfoModal = (value: any) => {
  return {
    type: TOGGLE_INFO_MODAL,
    value,
  };
};

export const createMarketContract = (value: any) => {
  return {
    type: CREATE_MARKET_CONTRACT,
    value,
  };
};
