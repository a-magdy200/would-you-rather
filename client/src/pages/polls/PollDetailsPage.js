import React, {useEffect} from "react";
import {
  Box,
  Grid,
} from "@material-ui/core";
import {answerPollRequest, getPollRequest, setRedirect} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../components/common/Loader";
import {withSnackbar} from "notistack";
import {useParams, Redirect} from "react-router";
import UserCard from "../../components/polls/UserCard";
import PollDetailsCard from "../../components/polls/PollDetailsCard";
import RequireLoginPage from "../RequireLoginPage";

const PollDetailsPage = ({enqueueSnackbar}) => {
  const dispatch = useDispatch();
  const {pollData, pollError} = useSelector(state => state.polls);
  const {isLoading} = useSelector(state => state.loading);
  const {pollId} = useParams();
  const {pollDetails, answerDetails} = pollData;
  const {isLoggedIn} = useSelector(state => state.user);
  const user = pollDetails?.createdBy;
  useEffect(() => {
    if (isLoggedIn) {
      enqueueSnackbar('Fetching poll details...', {variant: 'info'});
      dispatch(getPollRequest(pollId));
    }
  }, []);

  const onOptionClick = option => {
    dispatch(answerPollRequest(pollId, option));
  }

  if (isLoading) {
    return (
      <Loader/>
    )
  }
  if (pollError !== '') {
    return <Redirect to={{
      pathname: '/404',
      state: {
        snackbars: [{text: pollError, variant: 'error'}]
      }
    }} />
  }
  if (!isLoggedIn) {
    dispatch(setRedirect(`/polls/${pollId}`))
    return (
      <RequireLoginPage />
    )
  }
  return (
    <Box p={5}>
      <Grid container alignItems={'flex-start'} justify={'center'} spacing={4}>
        {user && <UserCard user={user} />}
        {pollDetails && <PollDetailsCard onOptionClick={onOptionClick} isLoggedIn={isLoggedIn} pollDetails={pollDetails} answerDetails={answerDetails} />}
      </Grid>
    </Box>
  )
}
export default withSnackbar(PollDetailsPage);
