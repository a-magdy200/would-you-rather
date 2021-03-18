import React from "react";
import {useSelector} from "react-redux";
import {Route, Redirect} from "react-router-dom";
import PropTypes from 'prop-types';
const GuestRoute = ({path, component: Component, ...rest}) => {
  let {isLoggedIn} = useSelector(state => state.user);
  return <Route path={path} {...rest} render={() => {
    return !isLoggedIn ?
      <Component /> :
      <Redirect to={'/'} />
  }} />
}
GuestRoute.prototype = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
}
export default GuestRoute;
