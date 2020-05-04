import { TOGGLE_SIGN_IN_MODAL } from "./Constants";

export const toggleSignInModal = (value: boolean) => {
  return {
    type: TOGGLE_SIGN_IN_MODAL,
    value,
  };
};
