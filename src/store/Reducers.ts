import {
  TOGGLE_SIGN_IN_MODAL,
  TOGGLE_TRADE_MODAL,
  TOGGLE_EMAIL_MODAL,
  TOGGLE_INFO_MODAL,
} from "./Constants";
import { InitialStateType } from "./Types";

export function LayoutReducer(state: InitialStateType, action: any) {
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
