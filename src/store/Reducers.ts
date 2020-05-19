import {
  TOGGLE_SIGN_IN_MODAL,
  TOGGLE_TRADE_MODAL,
  TOGGLE_EMAIL_MODAL,
  TOGGLE_INFO_MODAL,
  CREATE_MARKET_CONTRACT,
} from "./Constants";

export function ModalReducer(state: any, action: any) {
  switch (action.type) {
    case TOGGLE_SIGN_IN_MODAL: {
      return {
        ...state,
        signInModalIsOpen: action.payload,
      };
    }
    case TOGGLE_TRADE_MODAL: {
      return {
        ...state,
        tradeModalIsOpen: action.payload,
      };
    }

    case TOGGLE_EMAIL_MODAL: {
      return {
        ...state,
        emailModalIsOpen: action.payload,
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
