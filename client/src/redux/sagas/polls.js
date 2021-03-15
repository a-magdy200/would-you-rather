import {setLoading} from "../actions";
import {put, call, select, delay, takeLatest} from 'redux-saga/effects';
import {CREATE_POLL_REQUEST} from "../types";
import {getToken} from "../selectors";
function* createPoll() {
  yield put(setLoading(true));
  try {
    const token = yield select(getToken);
    yield delay(2000);
    yield put(setLoading(false));
  } catch (e) {

  }
}
function* createPollWatcher() {
  yield takeLatest(CREATE_POLL_REQUEST, createPoll);
}
export {
  createPollWatcher
}
