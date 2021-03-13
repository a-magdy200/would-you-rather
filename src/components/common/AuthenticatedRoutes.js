import React from "react";
import {useSelector} from "react-redux";
import {Route} from "react-router-dom";
import MyProfilePage from "../../pages/account/MyProfilePage";
import AccountSettingsPage from "../../pages/account/AccountSettingsPage";
import AnswerPollPage from "../../pages/polls/AnswerPollPage";
import MyPollsPage from "../../pages/polls/MyPollsPage";
const AuthenticatedRoutes = () => {
  let {isLoggedIn} = useSelector(state => state.user);
    return isLoggedIn ?
      <>
        <Route path={'/profile'} component={MyProfilePage}/>
        <Route path={'/settings'} component={AccountSettingsPage}/>
        <Route path={'/polls/:pollId/answer'} component={AnswerPollPage}/>
        <Route path={'/my-polls'} component={MyPollsPage}/>
      </> : null
}
export default AuthenticatedRoutes;
