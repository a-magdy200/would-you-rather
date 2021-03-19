import {applyMiddleware, compose, createStore} from "redux";
import createSagaMiddleware from 'redux-saga';
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import rootReducer from "./reducers";
import rootSaga from "./sagas";
import {createLogger} from "redux-logger";
import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'connected-react-router'


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
}
const history = createBrowserHistory();
const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
// const persistedReducer = persistReducer(persistConfig, rootReducer(history))

// const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware, logger, routerMiddleware(history)));
const store = createStore(
    persistReducer(persistConfig, rootReducer(history)), // root reducer with router state
    compose(
      applyMiddleware(
        sagaMiddleware,
        routerMiddleware(history), // for dispatching history actions
        logger
        // ... other middlewares ...
      ),
    ));
// Hot reloading
if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    store.replaceReducer(createRootReducer(history));
  });
}
const persistor = persistStore(store)
sagaMiddleware.run(rootSaga);
export {history, persistor};
export default store;
