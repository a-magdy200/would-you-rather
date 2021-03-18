import {Box, Button, Grid, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

const YouMustLogin = ({to}) => {
  return (
    <Box marginBottom={3}>
      <Grid direction={'column'} justify={'center'} alignItems={'center'} container>
        <Typography>You must login to {to}</Typography>
        <Link to={'/sign-in'}>
          <Button variant={'contained'} color={'primary'}>Login</Button>
        </Link>
      </Grid>
    </Box>
  )
}
YouMustLogin.prototype = {
  to: PropTypes.string.isRequired
}
export default YouMustLogin;
