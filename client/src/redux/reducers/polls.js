import {
  ANSWER_POLL_RESPONSE,
  CLEAR_POLL_DATA,
  CLEAR_POLL_INPUTS, CREATE_POLL_RESPONSE, FILTER_POLLS,
  GET_ALL_POLLS_RESPONSE, GET_LEADERBOARD_RESPONSE, GET_MY_POLLS_RESPONSE,
  GET_POLL_RESPONSE,
  UPDATE_POLL_INPUT
} from "../types";
import {filterPollsBy} from "../../helpers/functions";

const INITIAL_STATE = {
  pollData: {},
  polls: [],
  newPollData: {
    title: '',
    option1: '',
    option2: ''
  },
  filteredPolls: [],
  myPolls: [],
  filterBy: "unanswered",
  leaderboard: []
}

export default function pollsReducer(state = INITIAL_STATE, action) {
  const {type, payload, error} = action;
  let filteredPolls;
  switch (type) {
    case GET_POLL_RESPONSE:
      return {
        ...state,
        pollData: {...payload.pollData}
      };
    case GET_LEADERBOARD_RESPONSE:
      return {
        ...state,
        leaderboard: [...payload.leaderboard]
      };
    case CREATE_POLL_RESPONSE:
      return {
        ...state,
        polls: state.polls.concat([payload.poll])
      };
    case GET_MY_POLLS_RESPONSE:
      return {
        ...state,
        myPolls: [...payload.polls],
      };
    case GET_ALL_POLLS_RESPONSE:
      filteredPolls = filterPollsBy(payload.polls, 'unanswered');
      return {
        ...state,
        polls: [...payload.polls],
        filteredPolls: [...payload.polls],
      };
    case FILTER_POLLS:
      let {filterBy, userId} = payload;
      filteredPolls = filterPollsBy(state.polls, filterBy, userId);
      return {
        ...state,
        filterBy,
        filteredPolls: [...filteredPolls]
      }
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
