import {makeStyles} from "@material-ui/styles";
import {Box, CircularProgress} from "@material-ui/core";
import React from "react";

const styles = makeStyles({

  loadingContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
const Loader = () => {
  const classes = styles();
  return (
    <Box className={classes.loadingContainer}>
      <CircularProgress />
    </Box>
  )
};
export default Loader;
