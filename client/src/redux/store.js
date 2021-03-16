import {applyMiddleware, createStore} from "redux";
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
}

import rootReducer from "./reducers";
import rootSaga from "./sagas";
import {createLogger} from "redux-logger";
const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware, logger));
const persistor = persistStore(store)
sagaMiddleware.run(rootSaga);
export {store, persistor};
