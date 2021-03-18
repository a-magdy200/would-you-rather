import {CLEAR_REDIRECT, SET_REDIRECT} from "../types";

const INITIAL_STATE = {
  to: '/',
  params: {}
};
export default function appReducer(state = INITIAL_STATE, {type, payload}) {
  switch (type) {
    case SET_REDIRECT:
      const {to, params} = payload;
      return {
        to, params
      };
    case CLEAR_REDIRECT:
      return INITIAL_STATE;
    default:
      return state;
  }
}
