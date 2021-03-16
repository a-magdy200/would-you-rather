import React, {useEffect, useState} from "react";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Typography
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {clearPollInputs, createPollRequest, updatePollInput} from "../../redux/actions";
import {withSnackbar} from "notistack";
import {Redirect} from "react-router-dom";
import Loader from "../../components/common/Loader";
const CreatePollPage = ({enqueueSnackbar}) => {
  const dispatch = useDispatch();
  const {title, option1, option2} = useSelector(state => state.polls);
  const {isLoading} = useSelector(state => state.loading);
  const [creatingState, setCreatingState] = useState('');
  const resetInputs = () => {dispatch(clearPollInputs())}
  const onInputUpdate = (key, value) => {
    dispatch(updatePollInput(key, value));
  };
  const onSubmit = () => {
    enqueueSnackbar('Creating your poll...', {variant: 'info'});
    dispatch(createPollRequest());
  }
  useEffect(() => {
    if (isLoading) {
      setCreatingState('creating');
    } else {
      if (creatingState === 'creating') {
        setCreatingState('created');
      }
    }
  }, [isLoading]);
  if (isLoading) {
    return <Loader />
  }
  if (creatingState === 'created') {
    enqueueSnackbar('Your poll has been created successfully!', {variant: 'success'});
    return <Redirect to={'/'} />;
  }
  return (
    <Box p={3}>
      <Grid container justify={'center'} alignItems={'center'} direction={'column'}>
        <Grid item xl={6} lg={8} md={10} sm={12}>
          <Card variant={'elevation'}>
            <CardContent>
              <form>
                <Grid container justify={'center'} alignItems={'center'} direction={'column'}>
                  <Backdrop style={{zIndex: 9}} open={isLoading}><CircularProgress/></Backdrop>
                  <Typography
                    variant={'h3'}
                    gutterBottom={true}
                    component={'h3'}>Would you rather...?</Typography>
                  <Typography
                    variant={'body2'}
                    paragraph={true}
                    gutterBottom={true}
                    component={'p'}>Please try to be descriptive and precise as possible</Typography>
                  <TextField
                    margin={"normal"}
                    label={'Title'}
                    variant={'outlined'}
                    size={'medium'}
                    fullWidth={true}
                    multiline={true}
                    helperText={'This field is required'}
                    value={title}
                    onChange={(event) => onInputUpdate('title', event.target.value)}
                    required={true}
                    error={false}
                    name={'poll_title'}
                    placeholder={'i.e. eating apples or bananas'}/>
                  <TextField
                    label={'Option 1'}
                    variant={'outlined'}
                    size={'medium'}
                    margin={"normal"}
                    fullWidth={true}
                    required={true}
                    error={false}
                    helperText={'This field is required'}
                    value={option1}
                    onChange={(event) => onInputUpdate('option1', event.target.value)}
                    name={'poll_first_option'}
                    placeholder={'i.e. apples'}/>
                  <TextField
                    label={'Option 2'}
                    variant={'outlined'}
                    margin={"normal"}
                    size={'medium'}
                    fullWidth={true}
                    helperText={'This field is required'}
                    required={true}
                    error={false}
                    value={option2}
                    onChange={(event) => onInputUpdate('option2', event.target.value)}
                    name={'poll_second_option'}
                    placeholder={'i.e. bananas'}/>
                    <Box>
                      <Button style={{marginRight: 10}} onClick={resetInputs} variant={'outlined'}>Reset</Button>
                      <Button onClick={onSubmit} disabled={title === '' || option1 === '' || option2 === ''} variant={"contained"} color={'primary'}>Create</Button>
                    </Box>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
export default withSnackbar(CreatePollPage);
