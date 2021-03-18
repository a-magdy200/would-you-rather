import React, { useEffect, useState } from "react";
import {Link, useHistory} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import YouMustLogin from "../components/common/YouMustLogin";
import {Box, Button, Grid, Typography} from "@material-ui/core";
import {setRedirect} from "../redux/actions";
import {Result} from "antd";

const RequireLoginPage = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    let redirect = history?.location?.state?.redirect;
    if (redirect) {
      history.replace({
        pathname: '/require-login',
        state: {}
      });
      dispatch(setRedirect(...redirect));
    }
  }, []);
  return (
    <Box p={5}>
      <Grid direction={'column'} justify={'center'} alignItems={'center'} container>
        <Result
          status="403"
          title={<Typography align={'center'} variant={'h5'} gutterBottom={true}>Oops!</Typography>}
          subTitle={<Typography align={'center'} variant={'h6'} gutterBottom={true}>You are not authorized to be here...</Typography>}
          // extra={}
        />
        <YouMustLogin to={'proceed'} />
      </Grid>
    </Box>
  )
}
export default RequireLoginPage;
