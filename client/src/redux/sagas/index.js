import {createPollWatcher} from "./polls";
import { all} from 'redux-saga/effects';
function* rootSaga() {
  yield all([
    createPollWatcher()
  ])
}
export default rootSaga;
