import {CLEAR_POLL_DATA, GET_ALL_POLLS_RESPONSE, GET_POLL_RESPONSE} from "../types";

const INITIAL_STATE = {
  pollData: {},
  polls: [],
}

export default function (state = INITIAL_STATE, action) {
  const {type, payload, error} = action;
  switch (type) {
    case GET_POLL_RESPONSE:
      return {
        ...state,
        pollData: {...payload.pollData}
      };
    case GET_ALL_POLLS_RESPONSE:
      return {
        ...state,
        polls: [...payload.polls]
      };
    case CLEAR_POLL_DATA:
      return {
        ...state,
        pollData: {...INITIAL_STATE.pollData}
      };
    default:
      return state;
  }
}
