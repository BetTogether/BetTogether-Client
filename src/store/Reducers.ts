import {
  TOGGLE_CREATE_MARKET_MODAL,
  TOGGLE_INFO_MODAL,
  CREATE_MARKET_CONTRACT,
} from "./Constants";

export function ModalReducer(state: any, action: any) {
  switch (action.type) {
    case TOGGLE_CREATE_MARKET_MODAL: {
      return {
        ...state,
        createMarketModalIsOpen: action.payload,
      };
    }
    case TOGGLE_INFO_MODAL: {
      return {
        ...state,
        infoModalIsOpen: action.payload,
      };
    }

    default:
      return state;
  }
}

export function ContractReducer(state: any, action: any) {
  switch (action.type) {
    case CREATE_MARKET_CONTRACT: {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
}
