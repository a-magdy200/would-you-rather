import {
  CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_RESPONSE,
  SAVE_INFO_REQUEST,
  SAVE_INFO_RESPONSE,
  SET_LOADING_STATE,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_RESPONSE
} from "../types";

const setLoadingState = (key, value) => ({
  type: SET_LOADING_STATE,
  payload: {key, value}
});
const uploadImageRequest = (imageData) => ({
  type: UPLOAD_IMAGE_REQUEST,
  payload: {imageData}
});
const uploadImageResponse = (profilePictureUrl) => ({
  type: UPLOAD_IMAGE_RESPONSE,
  payload: {profilePictureUrl}
});
const saveInfoRequest = (info) => ({
  type: SAVE_INFO_REQUEST,
  payload: {info}
});
const saveInfoResponse = (info) => ({
  type: SAVE_INFO_RESPONSE,
  payload: {info}
});
const changePasswordRequest = (password) => ({
  type: CHANGE_PASSWORD_REQUEST,
  payload: {password}
});
const changePasswordResponse = () => ({
  type: CHANGE_PASSWORD_RESPONSE
});
export {
  uploadImageResponse,
  uploadImageRequest,
  setLoadingState,
  saveInfoResponse,
  saveInfoRequest,
  changePasswordResponse,
  changePasswordRequest
}

