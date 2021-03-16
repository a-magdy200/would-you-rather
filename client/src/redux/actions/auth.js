import {LOGOUT, SIGNIN_ERROR, SIGNIN_REQUEST, SIGNIN_RESPONSE, SIGNUP_ERROR, SIGNUP_REQUEST} from "../types";
const signInRequest = (loginData) => ({
  type: SIGNIN_REQUEST,
  payload: {loginData}
})
const signInResponse = (userData) => ({
  type: SIGNIN_RESPONSE,
  payload: {userData}
})
const signUpRequest = (signUpData) => ({
  type: SIGNUP_REQUEST,
  payload: {signUpData}
});
const setSignInError = (error) => ({
  type: SIGNIN_ERROR,
  error
})
const setSignUpError = (error) => ({
  type: SIGNUP_ERROR,
  error
})
const logout = () => ({
  type: LOGOUT
});
export {
  logout,
  signInRequest,
  signInResponse,
  signUpRequest,
  setSignInError,
  setSignUpError,
}
