import {
  answerPollWatcher,
  createPollWatcher,
  getAllPollsWatcher, getLeaderboardWatcher,
  getMyPollsWatcher,
  getPollDetailsWatcher
} from "./polls";
import { all} from 'redux-saga/effects';
import {changePasswordWatcher, updateUserImageWatcher, updateUserInfoWatcher} from "./user";
import {signInWatcher, signUpWatcher} from "./auth";
function* rootSaga() {
  yield all([
    createPollWatcher(),
    getAllPollsWatcher(),
    getMyPollsWatcher(),
    getPollDetailsWatcher(),
    answerPollWatcher(),
    getLeaderboardWatcher(),
    updateUserInfoWatcher(),
    changePasswordWatcher(),
    updateUserImageWatcher(),
    signInWatcher(),
    signUpWatcher()
  ])
}
export default rootSaga;
