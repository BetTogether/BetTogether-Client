import { TOGGLE_DROPDOWN } from "../actions/actionType";

export default function LayoutReducer(state: any, action: any) {
  switch (action.type) {
    case TOGGLE_DROPDOWN: {
      return {
        ...state,
        toggleDropdown: action.payload,
      };
    }

    default:
      return state;
  }
}
