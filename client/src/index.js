import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {ThemeProvider} from "@material-ui/styles";
import theme from "./config/theme";
import {SnackbarProvider} from "notistack";
import store, {history, persistor} from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react';
import {ConnectedRouter} from 'connected-react-router';
import Loader from "./components/common/Loader";
ReactDOM.render(
  // Remove Strict mode to use notifications
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>

  <Provider store={store}>
    <ConnectedRouter history={history}>
      <PersistGate persistor={persistor} loading={<Loader/>}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3} autoHideDuration={3000} disableWindowBlurListener={true}>
            <App />
          </SnackbarProvider>
        </ThemeProvider>
      </PersistGate>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
