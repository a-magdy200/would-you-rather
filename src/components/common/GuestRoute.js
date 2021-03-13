import React from "react";
import {useSelector} from "react-redux";
import {Route, Redirect} from "react-router-dom";

const GuestRoute = ({path, component: Component, ...rest}) => {
  let {isLoggedIn} = useSelector(state => state.user);
    return <Route path={path} {...rest} render={() => {
      return !isLoggedIn ?
        <Component /> :
        <Redirect to={'/'} />
    }} />
}
export default GuestRoute;
