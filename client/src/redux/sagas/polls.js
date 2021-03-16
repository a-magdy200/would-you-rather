import {
  clearPollInputs,
  createPollResponse,
  getAllPollsResponse, getLeaderboardResponse,
  getMyPollsResponse, getPollRequest,
  getPollResponse,
  setLoading,
  getPollError
} from "../actions";
import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
  ANSWER_POLL_REQUEST,
  CREATE_POLL_REQUEST,
  GET_ALL_POLLS_REQUEST, GET_LEADERBOARD_REQUEST,
  GET_MY_POLLS_REQUEST,
  GET_POLL_REQUEST
} from "../types";
import {getToken} from "../selectors";
import API from "../../api";
import {formatAuthorizationHeaders} from "../../helpers/functions";

function* createPoll() {
  yield put(setLoading(true));
  try {
    const token = yield select(getToken);
    const {newPollData} = yield select(state => state.polls);
    const response = yield call(API,'polls', 'post', newPollData, formatAuthorizationHeaders(token));
    yield put(createPollResponse(response.data));
    yield put(clearPollInputs());
    yield put(setLoading(false));
  } catch (e) {
    console.error(e);
  }
}

function* answerPoll({payload}) {
  yield put(setLoading(true));
  try {
    const token = yield select(getToken);
    const response = yield call(API,'polls/answer', 'post', payload, formatAuthorizationHeaders(token));
    yield put(getPollResponse(response.data));
    yield put(clearPollInputs());
    yield put(getPollRequest(payload.pollId));
  } catch (e) {
    console.error(e);
  }
}

function* getAllPolls() {
  yield put(setLoading(true));
  try {
    const response = yield call(API,'polls', 'get');
    yield put(getAllPollsResponse(response.data));
    yield put(setLoading(false));
  } catch (e) {
    console.error(e);
  }
}

function* getMyPolls() {
  yield put(setLoading(true));
  try {
    const token = yield select(getToken);
    const response = yield call(API,'polls/my-polls', 'get', {}, formatAuthorizationHeaders(token));
    yield put(getMyPollsResponse(response.data));
    yield put(setLoading(false));
  } catch (e) {
    console.error(e);
  }
}
function* getLeaderboard() {
  yield put(setLoading(true));
  try {
    const response = yield call(API,'polls/leaderboard', 'get', {});
    yield put(getLeaderboardResponse(response.data));
    yield put(setLoading(false));
  } catch (e) {
    console.error(e);
  }
}
function* getPollDetails(action) {
  yield put(setLoading(true));
  yield put(getPollError(''));
  try {
    const token = yield select(getToken);
    const response = yield call(API,`polls/${action.payload.pollId}`, 'get', {}, formatAuthorizationHeaders(token));
    if (response.data.error) {
      yield put(getPollError(response.data.error));
    } else {
      yield put(getPollResponse(response.data));
    }
    yield put(setLoading(false));
  } catch (e) {
    console.error(e);
  }
}

function* getPollDetailsWatcher() {
  yield takeLatest(GET_POLL_REQUEST, getPollDetails);
}

function* createPollWatcher() {
  yield takeLatest(CREATE_POLL_REQUEST, createPoll);
}

function* answerPollWatcher() {
  yield takeLatest(ANSWER_POLL_REQUEST, answerPoll);
}

function* getAllPollsWatcher() {
  yield takeLatest(GET_ALL_POLLS_REQUEST, getAllPolls);
}

function* getMyPollsWatcher() {
  yield takeLatest(GET_MY_POLLS_REQUEST, getMyPolls);
}
function* getLeaderboardWatcher() {
  yield takeLatest(GET_LEADERBOARD_REQUEST, getLeaderboard);
}

export {
  createPollWatcher,
  getAllPollsWatcher,
  getMyPollsWatcher,
  getPollDetailsWatcher,
  answerPollWatcher,
  getLeaderboardWatcher
}
