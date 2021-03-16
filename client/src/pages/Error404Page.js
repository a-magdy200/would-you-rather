import React, { useEffect } from "react";
import { withSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
const Error404Page = ({enqueueSnackbar}) => {
  let history = useHistory();

  useEffect(() => {
    let snackbars = history?.location?.state?.snackbars;
    if (snackbars) {
      snackbars.map(({text, variant}) => enqueueSnackbar(text, {variant}));
      history.replace({
        pathname: '/404',
        state: {}
      });
    }
  }, []);
  return (
    <h1>Error 404 Page</h1>
  )
}
export default withSnackbar(Error404Page);
