import { TOGGLE_SIGN_IN_MODAL } from "./actionTypes";

export const toggleSignInModal = (value: any) => {
  return {
    type: TOGGLE_SIGN_IN_MODAL,
    payload: { value },
  };
};
