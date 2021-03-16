import React, {useEffect, useState} from "react";
import {
  Box,
  Button,
  Card,
  CardContent, Checkbox,
  CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle,
  FormControlLabel,
  Grid,
  TextField,
  Typography
} from "@material-ui/core";
import {withSnackbar} from "notistack";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {setSignInError, setSignUpError, signUpRequest} from "../../redux/actions";
import {Alert} from "@material-ui/lab";

const SignUpPage = ({enqueueSnackbar}) => {
  const dispatch = useDispatch();
  const {signUpError} = useSelector(state => state.auth);
  const {isLoading} = useSelector(state => state.loading);
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [terms, setTerms] = useState(false);
  const [dialog, setDialog] = useState(false);
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
  const onSignUpClick = () => {
    enqueueSnackbar('Creating your account...', {variant: 'info'});
    dispatch(signUpRequest(form));
  }
  return (
    <Box p={5}>
      <Grid container justify={'center'}>
        <Card>
          <CardContent>
            <Typography color={'primary'} component={'h3'} gutterBottom={true} align={'center'} variant={'h3'}>Create a new account</Typography>
            {signUpError && <Alert color={'error'} severity={'error'}>{signUpError}</Alert>}
            <TextField
              label={'First Name'}
              variant={'outlined'}
              margin={"normal"}
              size={'medium'}
              type={'text'}
              fullWidth={true}
              value={form.firstname}
              onChange={(event) => onInputUpdate('firstname', event.target.value)}
              name={'firstname'}
              placeholder={'Your first name...'}/>
            <TextField
              label={'Last Name'}
              variant={'outlined'}
              margin={"normal"}
              size={'medium'}
              type={'text'}
              fullWidth={true}
              value={form.lastname}
              onChange={(event) => onInputUpdate('lastname', event.target.value)}
              name={'lastname'}
              placeholder={'Your last name...'}/>
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
            <TextField
              label={'Confirm Password'}
              variant={'outlined'}
              margin={"normal"}
              size={'medium'}
              type={'password'}
              fullWidth={true}
              value={form.confirmPassword}
              onChange={(event) => onInputUpdate('confirmPassword', event.target.value)}
              name={'confirmPassword'}
              placeholder={'Confirm your password...'}/>
              <Grid container alignItems={'center'}>
                <Checkbox
                  checked={terms}
                  onChange={() => setTerms(!terms)}
                  name="terms"
                  color="primary"
                />
                <Typography>
                  By checking this, I agree on
                </Typography>
                <Button size={'small'} onClick={() => setDialog(true)} color={"primary"} variant={"text"}>
                  Terms &  Conditions.
                </Button>
              </Grid>
            <Dialog onClose={() => setDialog(false)} aria-labelledby="customized-dialog-title" open={dialog}>
              <DialogTitle id="customized-dialog-title" onClose={() => setDialog(false)}>
                Terms and Conditions
              </DialogTitle>
              <DialogContent dividers>
                <Typography gutterBottom>
                  Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                  in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button autoFocus variant={"contained"} onClick={() => setDialog(false)} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
            <Typography gutterBottom={true} variant={'subtitle1'}>
              Already have an account?
              <Link to={'/sign-in'}>
                <Button color={'primary'} size={'small'} variant={'text'}>
                  Sign In
                </Button>
              </Link>
            </Typography>
            <Grid container justify={'center'}>
              <Button disabled={form.email === '' || form.password !== form.confirmPassword || form.firstname === '' || form.lastname === '' || form.confirmPassword === '' || form.password === '' || isLoading || !terms} onClick={onSignUpClick} variant={'contained'} size={'large'} color={'primary'}>
                {isLoading && <CircularProgress style={{marginRight: 5}} />}
                Sign Up
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Box>
  )
}
export default withSnackbar(SignUpPage);
