import React, {useEffect, useState} from "react";
import {
  Box, Card, CardMedia,
  Grid,
} from "@material-ui/core";
import {answerPollRequest, getAllPollsRequest, getPollRequest} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import PollCard from "../../components/polls/PollCard";
import Filter from "../../components/polls/Filter";
import Loader from "../../components/common/Loader";
import {withSnackbar} from "notistack";
import {useParams} from "react-router";
import UserCard from "../../components/polls/UserCard";
import PollDetailsCard from "../../components/polls/PollDetailsCard";

const PollDetailsPage = ({enqueueSnackbar}) => {
  const dispatch = useDispatch();
  const {pollData} = useSelector(state => state.polls);
  const {isLoading} = useSelector(state => state.loading);
  const {pollId} = useParams();
  const {pollDetails, answerDetails} = pollData;
  const {isLoggedIn} = useSelector(state => state.user);
  const user = pollDetails?.createdBy;
  useEffect(() => {
    enqueueSnackbar('Fetching poll details...', {variant: 'info'});
    dispatch(getPollRequest(pollId));
  }, []);

  const onOptionClick = option => {
    dispatch(answerPollRequest(pollId, option));
  }

  if (isLoading) {
    return (
      <Loader/>
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
