import React, {useEffect, useState} from "react";
import {Box, Button, Card, CardContent, CircularProgress, Grid, TextField, Typography} from "@material-ui/core";
import {withSnackbar} from "notistack";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {setSignInError, setSignUpError,  signInRequest} from "../../redux/actions";
import {Alert} from "@material-ui/lab";
const SignInPage = ({enqueueSnackbar}) => {
  const dispatch = useDispatch();
  const {signInError} = useSelector(state => state.auth);
  const {isLoading} = useSelector(state => state.loading);
  const [form, setForm] = useState({email: '', password: ''});
  useEffect(() => {
    dispatch(setSignInError(''));
    dispatch(setSignUpError(''));
  }, []);
  const onInputUpdate = (key, value) => {
    setForm({
      ...form,
      [key]: value
    });
  };
  const onSignInClick = () => {
    enqueueSnackbar('Attempting to sign in...', {variant: 'info'});
    dispatch(signInRequest(form));
  }
  return (
    <Box p={5}>
      <Grid container justify={'center'}>
        <Card>
          <CardContent>
            <Typography color={'primary'} component={'h3'} gutterBottom={true} align={'center'} variant={'h3'}>Sign In</Typography>
            {signInError && <Alert color={'error'} severity={'error'}>{signInError}</Alert>}
            <TextField
              label={'Email'}
              variant={'outlined'}
              margin={"normal"}
              size={'medium'}
              type={'email'}
              fullWidth={true}
              value={form.email}
              onChange={(event) => onInputUpdate('email', event.target.value)}
              name={'email'}
              placeholder={'Your email...'}/>
            <TextField
              label={'Password'}
              variant={'outlined'}
              margin={"normal"}
              size={'medium'}
              type={'password'}
              fullWidth={true}
              value={form.password}
              onChange={(event) => onInputUpdate('password', event.target.value)}
              name={'password'}
              placeholder={'Your password...'}/>
            <Typography gutterBottom={true} variant={'subtitle1'}>
              Don't have an account?
              <Link to={'/sign-up'}>
                <Button color={'primary'} size={'small'} variant={'text'}>
                  Create one
                </Button>
              </Link>
              </Typography>
            <Grid container justify={'center'}>
              <Button disabled={form.email === '' || form.password === '' || isLoading} onClick={onSignInClick} variant={'contained'} size={'large'} color={'primary'}>
                {isLoading && <CircularProgress style={{marginRight: 5}} />}
                Sign In
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Box>
  )
}
export default withSnackbar(SignInPage);
