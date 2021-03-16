import {combineReducers} from "redux";
import user from './user';
import polls from './polls';
import loading from './loading';
import auth from './auth';
const rootReducer = combineReducers({user, polls, loading, auth});
export default rootReducer;
