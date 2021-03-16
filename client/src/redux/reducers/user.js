import {LOGOUT, SAVE_INFO_RESPONSE, SET_LOADING_STATE, SIGNIN_RESPONSE, UPLOAD_IMAGE_RESPONSE} from "../types";
import {merge} from 'lodash';

const INITIAL_STATE = {
  isLoggedIn: false,
  profile: {
    firstname: '',
    lastname: '',
    email: '',
    profilePicture: '',
    _id: '',
    createdPolls: [],
    answeredPolls: [],
    score: 0
  },
  savingImage: false,
  savingInfo: false,
  savingPassword: false,
  token: ''
};
export default function userReducer(state = INITIAL_STATE, action) {
  const {type, payload, error} = action;
  let newState = {};
  switch(type) {
    case SET_LOADING_STATE:
      newState = merge({}, state);
      newState[payload.key] = payload.value;
      return newState;
    case SAVE_INFO_RESPONSE:
      newState = merge({}, state);
      newState.profile = {
        ...state.profile,
        ...payload.info
      };
      return newState
    case UPLOAD_IMAGE_RESPONSE:
      newState = merge({}, state);
      newState.profile.profilePicture = payload.profilePictureUrl;

      return newState
    case SIGNIN_RESPONSE:
      newState = merge({}, state);
      newState.isLoggedIn = true;
      newState.token = payload.userData.token;
      newState.profile = payload.userData.profile;
      return newState
    case LOGOUT:
      newState = merge({}, INITIAL_STATE);
      return newState;
    default:
      return state;
  }
}
