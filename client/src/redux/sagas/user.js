import {call, put, select, delay, takeLatest} from "redux-saga/effects";
import {getToken} from "../selectors";
import API from "../../api";
import {formatAuthorizationHeaders} from "../../helpers/functions";
import {CHANGE_PASSWORD_REQUEST, SAVE_INFO_REQUEST, UPLOAD_IMAGE_REQUEST} from "../types";
import {saveInfoResponse, setLoadingState, uploadImageResponse} from "../actions/user";

function* updateUserInfo({payload}) {
  yield put(setLoadingState('savingInfo', true));
  try {
    const token = yield select(getToken);
    yield call(API,`users/`, 'put', payload.info, formatAuthorizationHeaders(token));
    yield put(saveInfoResponse({...payload.info}));
    yield put(setLoadingState('savingInfo', false));
  } catch (e) {
    console.error(e);
  }
}

function* updateUserImage({payload}) {
  yield put(setLoadingState('savingImage', true));
  try {
    const token = yield select(getToken);
    const formData = new FormData();
    formData.append('image', payload.imageData);
    const response = yield call(API,`users/upload-image`, 'post', formData, {
      ...formatAuthorizationHeaders(token),
      'Content-Type': 'multipart/form-data'
    });
    yield put(uploadImageResponse(response.data));
    yield put(setLoadingState('savingImage', false));
  } catch (e) {
    console.error(e);
  }
}

function* changePassword({payload}) {
  yield put(setLoadingState('savingPassword', true));
  try {
    const token = yield select(getToken);
    yield call(API,`users/change-password`, 'put', {password: payload.password}, formatAuthorizationHeaders(token));
    yield put(setLoadingState('savingPassword', false));
  } catch (e) {
    console.error(e);
  }
}

function* updateUserImageWatcher() {
  yield takeLatest(UPLOAD_IMAGE_REQUEST, updateUserImage);
}

function* updateUserInfoWatcher() {
  yield takeLatest(SAVE_INFO_REQUEST, updateUserInfo);
}

function* changePasswordWatcher() {
  yield takeLatest(CHANGE_PASSWORD_REQUEST, changePassword);
}

export {
  updateUserInfoWatcher,
  changePasswordWatcher,
  updateUserImageWatcher
}
