import {SET_LOADING} from "../types";

const INITIAL_STATE = {
  isLoading: false
}

export default function loadingReducer(state = INITIAL_STATE, {type, payload}) {
  switch (type) {
    case SET_LOADING:
      return {
        isLoading: payload.isLoading
      }
    default:
      return state;
  }
}
