import {
  CREATE_POLL_REQUEST,
  CREATE_POLL_RESPONSE,
  ANSWER_POLL_REQUEST,
  GET_POLL_REQUEST,
  GET_POLL_RESPONSE,
  GET_ALL_POLLS_REQUEST,
  GET_ALL_POLLS_RESPONSE,
  FILTER_POLLS,
  UPDATE_POLL_INPUT,
  CLEAR_POLL_INPUTS,
  GET_MY_POLLS_RESPONSE,
  GET_MY_POLLS_REQUEST, GET_LEADERBOARD_REQUEST, GET_LEADERBOARD_RESPONSE,
} from '../types';


const createPollRequest = () => ({
  type: CREATE_POLL_REQUEST
});
const createPollResponse = (poll) => ({
  type: CREATE_POLL_RESPONSE,
  payload: {poll}
})
const answerPollRequest = (pollId, answer) => ({
  type: ANSWER_POLL_REQUEST,
  payload: {pollId, answer}
});
const getPollRequest = (pollId) => ({
  type: GET_POLL_REQUEST,
  payload: {pollId}
});
const getPollResponse = (pollData) => ({
  type: GET_POLL_RESPONSE,
  payload: {pollData}
})
const getAllPollsRequest = () => ({
  type: GET_ALL_POLLS_REQUEST
});
const getAllPollsResponse = (polls) => ({
  type: GET_ALL_POLLS_RESPONSE,
  payload: {polls}
})
const getMyPollsRequest = () => ({
  type: GET_MY_POLLS_REQUEST
});
const getMyPollsResponse = (polls) => ({
  type: GET_MY_POLLS_RESPONSE,
  payload: {polls}
})
const getLeaderboardRequest = () => ({
  type: GET_LEADERBOARD_REQUEST
});
const getLeaderboardResponse = (leaderboard) => ({
  type: GET_LEADERBOARD_RESPONSE,
  payload: {leaderboard}
})
const filterPolls = (filterBy, userId) => ({
  type: FILTER_POLLS,
  payload: {filterBy, userId}
});
const updatePollInput = (key, value) => ({
  type: UPDATE_POLL_INPUT,
  payload: {key, value}
});
const clearPollInputs = () => ({
  type: CLEAR_POLL_INPUTS
});
export {
  updatePollInput,
  clearPollInputs,
  createPollRequest,
  createPollResponse,
  getAllPollsRequest,
  getAllPollsResponse,
  getPollRequest,
  getPollResponse,
  answerPollRequest,
  filterPolls,
  getMyPollsRequest,
  getMyPollsResponse,
  getLeaderboardRequest,
  getLeaderboardResponse
}
