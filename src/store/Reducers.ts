import { TOGGLE_SIGN_IN_MODAL, TOGGLE_TRADE_MODAL } from "./Constants";
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

    default:
      return state;
  }
}
