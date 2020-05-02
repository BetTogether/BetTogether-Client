import { TOGGLE_DROPDOWN } from "./actionTypes";

export const toggleDropdown = (value: any) => {
  return {
    type: TOGGLE_DROPDOWN,
    payload: { value },
  };
};
