import {call, put, takeLatest} from "redux-saga/effects";
import {setLoading, setSignInError, setSignUpError, signInResponse} from "../actions";
import API from "../../api";
import {SIGNIN_REQUEST, SIGNUP_REQUEST} from "../types";

function* signIn({payload}) {
  yield put(setLoading(true));
  try {
    const response = yield call(API,`users/sign-in`, 'post', payload.loginData);
    if (response.data.error) {
      yield put(setSignInError(response.data.error));
    } else {
      yield put(signInResponse(response.data));
    }    yield put(setLoading(false));
  } catch (e) {
    console.error(e);
  }
}

function* signUp({payload}) {
  yield put(setLoading(true));
  try {
    const response = yield call(API,`users/sign-up`, 'post', payload.signUpData);
    if (response.data.error) {
      yield put(setSignUpError(response.data.error));
    } else {
      yield put(signInResponse(response.data));
    }
    yield put(setLoading(false));
  } catch (e) {
    console.error(e);
  }
}

function* signUpWatcher() {
  yield takeLatest(SIGNUP_REQUEST, signUp);
}

function* signInWatcher() {
  yield takeLatest(SIGNIN_REQUEST, signIn);
}
export {
  signInWatcher,
  signUpWatcher
}
