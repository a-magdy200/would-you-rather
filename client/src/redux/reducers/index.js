import {combineReducers} from "redux";
import user from './user';
import polls from './polls';
import loading from './loading';
import auth from './auth';
import app from './app';
import { connectRouter } from 'connected-react-router'

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  user, polls, loading, auth, app
});
export default rootReducer;
