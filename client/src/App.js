import React from "react";
import {BrowserRouter, Switch, Route, useHistory} from "react-router-dom";
import Header from "./components/common/Header";
import {Box, Container} from "@material-ui/core";
import Error404Page from "./pages/Error404Page";
import UserProfilePage from "./pages/account/UserProfilePage";
import PollDetailsPage from "./pages/polls/PollDetailsPage";
import CreatePollPage from "./pages/polls/CreatePollPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import PrivateRoute from "./components/common/PrivateRoute";
import MyProfilePage from "./pages/account/MyProfilePage";
import AccountSettingsPage from "./pages/account/AccountSettingsPage";
import MyPollsPage from "./pages/polls/MyPollsPage";
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ForgetPasswordPage from "./pages/auth/ForgetPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import VerifyCodePage from "./pages/auth/VerifyCodePage";
import GuestRoute from "./components/common/GuestRoute";
import HomePage from "./pages/polls/HomePage";
import RequireLoginPage from "./pages/RequireLoginPage";
import { ConnectedRouter } from 'connected-react-router'
import {history} from "./redux/store";

function App() {

  return (
      <Box>
        <Header />
        <Container>
          <Switch>
            <Route exact path={'/'} component={HomePage}/>
            <PrivateRoute path={'/profile'} component={MyProfilePage}/>
            <PrivateRoute path={'/settings'} component={AccountSettingsPage}/>
            <PrivateRoute path={'/my-polls'} component={MyPollsPage}/>
            <PrivateRoute path={'/leaderboard'} component={LeaderboardPage}/>
            <PrivateRoute path={'/user/:userId'} component={UserProfilePage}/>
            <PrivateRoute path={'/polls/add'} component={CreatePollPage}/>
            <GuestRoute path={'/sign-in'} component={SignInPage}/>
            <GuestRoute path={'/sign-up'} component={SignUpPage}/>
            <GuestRoute path={'/forget-password'} component={ForgetPasswordPage}/>
            <GuestRoute path={'/reset-password'} component={ResetPasswordPage}/>
            <GuestRoute path={'/verify-email'} component={VerifyEmailPage}/>
            <GuestRoute path={'/verify-code'} component={VerifyCodePage}/>
            <GuestRoute path={'/require-login'} component={RequireLoginPage}/>
            <Route path={'/polls/:pollId'} component={PollDetailsPage}/>
            <Route path={'/404'} component={Error404Page}/>
            <Route component={Error404Page}/>
          </Switch>
        </Container>
      </Box>
    );
}

export default App;
