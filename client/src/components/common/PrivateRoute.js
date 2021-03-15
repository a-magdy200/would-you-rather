import React from "react";
import {useSelector} from "react-redux";
import {Route, Redirect} from "react-router-dom";

const PrivateRoute = ({path, component: Component, ...rest}) => {
  let {isLoggedIn} = useSelector(state => state.user);
    return <Route {...rest} path={path} render={() => {
      return isLoggedIn ?
        <Component /> :
        <Redirect to={'/sign-in'} />
    }}/>
}
export default PrivateRoute;
