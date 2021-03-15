import {
  CLEAR_POLL_DATA,
  CLEAR_POLL_INPUTS,
  GET_ALL_POLLS_RESPONSE,
  GET_POLL_RESPONSE,
  UPDATE_POLL_INPUT
} from "../types";

const INITIAL_STATE = {
  pollData: {},
  polls: [],
  newPollData: {
    title: '',
    option1: '',
    option2: ''
  }
}

export default function pollsReducer(state = INITIAL_STATE, action) {
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
    case UPDATE_POLL_INPUT:
      return {
        ...state,
        newPollData: {
          ...state.newPollData,
          [payload.key]: payload.value
        }
      };
    case CLEAR_POLL_INPUTS:
      return {
        ...state,
        newPollData: {
          ...INITIAL_STATE.newPollData
        }
      };
    default:
      return state;
  }
}
