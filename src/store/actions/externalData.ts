import { FETCH_ETH_PRICE } from "./actionTypes";

export const fetchEthPrice = () => {
  return {
    type: FETCH_ETH_PRICE,
    payload: {},
  };
};
