import {applyMiddleware, createStore} from "redux";
import createSagaMiddleware from 'redux-saga';
import rootReducer from "./reducers";
import rootSaga from "./sagas";
import {createLogger} from "redux-logger";
const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

export default createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(rootSaga);
