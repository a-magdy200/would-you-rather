import {SIGNIN_ERROR, SIGNUP_ERROR} from "../types";

const INITIAL_STATE = {
  login: {
    email: '',
    password: ''
  },
  signup: {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
  },
  signInError: '',
  signUpError: '',
}
export default function authReducer(state = INITIAL_STATE, action) {
  const {type, payload, error} = action;
  switch(type) {
    case SIGNIN_ERROR:
      return {
        ...state,
        signInError: error
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        signUpError: error,
      }
    default:
      return state;
  }
}
