import {CLEAR_REDIRECT, SET_REDIRECT} from "../types";

const setRedirect = (to = '/', params = {}) => ({
  type: SET_REDIRECT,
  payload: {to, params}
});
const clearRedirect = () => ({
  type: CLEAR_REDIRECT,
});
export {
  setRedirect,
  clearRedirect
}
