import React from "react";
import {useSelector} from "react-redux";
import {Route} from "react-router-dom";
import SignInPage from "../../pages/auth/SignInPage";
import SignUpPage from "../../pages/auth/SignUpPage";
import ForgetPasswordPage from "../../pages/auth/ForgetPasswordPage";
import ResetPasswordPage from "../../pages/auth/ResetPasswordPage";
import VerifyEmailPage from "../../pages/auth/VerifyEmailPage";
import VerifyCodePage from "../../pages/auth/VerifyCodePage";
const AuthRoutes = () => {
  let {isLoggedIn} = useSelector(state => state.user);
    return !isLoggedIn ?
      <>
        <Route path={'/sign-in'} component={SignInPage}/>
        <Route path={'/signup'} component={SignUpPage}/>
        <Route path={'/forget-password'} component={ForgetPasswordPage}/>
        <Route path={'/reset-password'} component={ResetPasswordPage}/>
        <Route path={'/verify-email'} component={VerifyEmailPage}/>
        <Route path={'/verify-code'} component={VerifyCodePage}/>
      </> : null
}
export default AuthRoutes;
