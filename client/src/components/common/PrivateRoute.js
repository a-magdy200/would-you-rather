import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Route, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {setRedirect} from "../../redux/actions";

const PrivateRoute = ({path, component: Component, ...rest}) => {
  let {isLoggedIn} = useSelector(state => state.user);
  const dispatch = useDispatch();
  dispatch(setRedirect(path));
  return <Route {...rest} path={path} render={() => {
    return isLoggedIn ?
      <Component /> :
      <Redirect to={'/require-login'} />
  }}/>
}
PrivateRoute.prototype = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
}
export default PrivateRoute;
