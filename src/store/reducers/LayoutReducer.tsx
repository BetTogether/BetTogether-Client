import { TOGGLE_SIGN_IN_MODAL } from "../actions/actionType";

export default function LayoutReducer(state: any, action: any) {
  switch (action.type) {
    case TOGGLE_SIGN_IN_MODAL: {
      return {
        ...state,
        signInModalIsOpen: action.payload,
      };
    }

    default:
      return state;
  }
}
