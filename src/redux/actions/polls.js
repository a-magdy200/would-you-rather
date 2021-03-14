import {
  CREATE_POLL_REQUEST,
  CREATE_POLL_RESPONSE,
  ANSWER_POLL_REQUEST,
  ANSWER_POLL_RESPONSE,
  GET_POLL_REQUEST,
  GET_POLL_RESPONSE,
  GET_ALL_POLLS_REQUEST,
  GET_ALL_POLLS_RESPONSE,
  GET_POLLS_REQUEST,
  GET_POLLS_RESPONSE, CLEAR_POLL_DATA,
} from '../types';
const createPollRequest = (poll) => ({
  type: CREATE_POLL_REQUEST,
  payload: {poll}
});
const createPollResponse = () => ({
  type: CREATE_POLL_RESPONSE
})
const answerPollRequest = (answer) => ({
  type: ANSWER_POLL_REQUEST,
  payload: {answer}
});
const answerPollResponse = (poll) => ({
  type: ANSWER_POLL_RESPONSE,
  payload: {poll}
})
const getPollRequest = (pollId) => ({
  type: GET_POLL_REQUEST,
  payload: {pollId}
});
const getPollResponse = (pollData) => ({
  type: GET_POLL_RESPONSE,
  payload: {pollData}
})
const getAllPollsRequest = (poll) => ({
  type: GET_ALL_POLLS_REQUEST,
  payload: {poll}
});
const getAllPollsResponse = (polls) => ({
  type: GET_ALL_POLLS_RESPONSE,
  payload: {polls}
})
const getPollsRequest = () => ({
  type: GET_POLLS_REQUEST
});
const clearPollData = () => ({
  type: CLEAR_POLL_DATA
});
const getPollsResponse = (polls) => ({
  type: GET_POLLS_RESPONSE,
  payload: {polls}
})
export {
  clearPollData,
  createPollRequest,
  createPollResponse,
  getAllPollsRequest,
  getAllPollsResponse,
  getPollRequest,
  getPollResponse,
  getPollsRequest,
  getPollsResponse,
  answerPollRequest,
  answerPollResponse,
}
