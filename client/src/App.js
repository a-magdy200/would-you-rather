import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Header from "./components/common/Header";
import {Container} from "@material-ui/core";
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

function App() {
  return (
      <BrowserRouter>
        <Header />
        <Container>
          <Switch>
            <Route exact path={'/'} component={HomePage}/>
            <PrivateRoute path={'/profile'} component={MyProfilePage}/>
            <PrivateRoute path={'/settings'} component={AccountSettingsPage}/>
            <PrivateRoute path={'/my-polls'} component={MyPollsPage}/>
            <GuestRoute path={'/sign-in'} component={SignInPage}/>
            <GuestRoute path={'/sign-up'} component={SignUpPage}/>
            <GuestRoute path={'/forget-password'} component={ForgetPasswordPage}/>
            <GuestRoute path={'/reset-password'} component={ResetPasswordPage}/>
            <GuestRoute path={'/verify-email'} component={VerifyEmailPage}/>
            <GuestRoute path={'/verify-code'} component={VerifyCodePage}/>
            <Route path={'/user/:userId'} component={UserProfilePage}/>
            <Route path={'/polls/add'} component={CreatePollPage}/>
            <Route path={'/polls/:pollId'} component={PollDetailsPage}/>
            <Route path={'/leaderboard'} component={LeaderboardPage}/>
            <Route component={Error404Page}/>
          </Switch>
        </Container>
      </BrowserRouter>
    );
}

export default App;
