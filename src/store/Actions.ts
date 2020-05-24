import {
  TOGGLE_CREATE_MARKET_MODAL,
  TOGGLE_INFO_MODAL,
  CREATE_MARKET_CONTRACT,
} from "./Constants";

export const toggleCreateMarketModal = (value: boolean) => {
  return {
    type: TOGGLE_CREATE_MARKET_MODAL,
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
