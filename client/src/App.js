import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Header from "./components/header/Header";
import {Container} from "@material-ui/core";
import HomePage from "./pages/HomePage";
import Error404Page from "./pages/Error404Page";
import UserProfilePage from "./pages/account/UserProfilePage";
import PollDetailsPage from "./pages/polls/PollDetailsPage";
import CreatePollPage from "./pages/polls/CreatePollPage";
import AllPollsPage from "./pages/polls/AllPollsPage";
import LeaderboardsPage from "./pages/LeaderboardsPage";
import PrivateRoute from "./components/common/PrivateRoute";
import MyProfilePage from "./pages/account/MyProfilePage";
import AccountSettingsPage from "./pages/account/AccountSettingsPage";
import AnswerPollPage from "./pages/polls/AnswerPollPage";
import MyPollsPage from "./pages/polls/MyPollsPage";
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ForgetPasswordPage from "./pages/auth/ForgetPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import VerifyCodePage from "./pages/auth/VerifyCodePage";
import GuestRoute from "./components/common/GuestRoute";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Switch>
          <Route exact path={'/'} component={HomePage}/>
          <PrivateRoute path={'/profile'} component={MyProfilePage}/>
          <PrivateRoute path={'/settings'} component={AccountSettingsPage}/>
          <PrivateRoute path={'/polls/:pollId/answer'} component={AnswerPollPage}/>
          <PrivateRoute path={'/my-polls'} component={MyPollsPage}/>
          <GuestRoute path={'/sign-in'} component={SignInPage}/>
          <GuestRoute path={'/sign-up'} component={SignUpPage}/>
          <GuestRoute path={'/forget-password'} component={ForgetPasswordPage}/>
          <GuestRoute path={'/reset-password'} component={ResetPasswordPage}/>
          <GuestRoute path={'/verify-email'} component={VerifyEmailPage}/>
          <GuestRoute path={'/verify-code'} component={VerifyCodePage}/>
          <Route path={'/user/:userId'} component={UserProfilePage}/>
          <Route path={'/polls/create'} component={CreatePollPage}/>
          <Route path={'/polls/:pollId'} component={PollDetailsPage}/>
          <Route exact path={'/polls'} component={AllPollsPage}/>
          <Route path={'/leaderboards'} component={LeaderboardsPage}/>
          <Route component={Error404Page}/>
        </Switch>
      </Container>
    </BrowserRouter>
    );
}

export default App;
