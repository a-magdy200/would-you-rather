import React from "react";
import {Provider} from "react-redux";
import store from "./redux/store";
import { SnackbarProvider } from 'notistack';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Header from "./components/header/Header";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./config/theme";
import {Container} from "@material-ui/core";
import HomePage from "./pages/HomePage";
import Error404Page from "./pages/Error404Page";
import UserProfilePage from "./pages/account/UserProfilePage";
import PollDetailsPage from "./pages/polls/PollDetailsPage";
import CreatePollPage from "./pages/polls/CreatePollPage";
import AllPollsPage from "./pages/polls/AllPollsPage";
import LeaderboardsPage from "./pages/LeaderboardsPage";
import AuthenticatedRoutes from "./components/common/AuthenticatedRoutes";
import AuthRoutes from "./components/common/AuthRoutes";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <BrowserRouter>
            <Header />
            <Container >
              <Switch>
                <Route exact path={'/'} component={HomePage}/>
                <AuthenticatedRoutes/>
                <AuthRoutes/>
                <Route path={'/user/:userId'} component={UserProfilePage}/>
                <Route path={'/polls/create'} component={CreatePollPage}/>
                <Route path={'/polls/:pollId'} component={PollDetailsPage}/>
                <Route exact path={'/polls'} component={AllPollsPage}/>
                <Route path={'/leaderboards'} component={LeaderboardsPage}/>
                <Route component={Error404Page}/>
              </Switch>
            </Container>
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
    );
}

export default App;
