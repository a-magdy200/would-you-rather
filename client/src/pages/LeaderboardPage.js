import React, {useEffect} from "react";
import {
  Box,
  Grid,
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import LeaderboardCard from "../components/polls/LeaderboardCard";
import {getLeaderboardRequest} from "../redux/actions";
import Loader from "../components/common/Loader";

const LeaderboardPage = () => {
  const dispatch = useDispatch();
  const {leaderboard} = useSelector(state => state.polls);
  const {isLoading} = useSelector(state => state.loading);
  useEffect(() => {
    dispatch(getLeaderboardRequest());
  }, []);
  if (isLoading) {
    return (
      <Loader/>
    )
  }
  return (
    <Box p={5}>
      <Grid container alignItems={'center'} justify={'center'} spacing={2}>
        {leaderboard.map((user) => <LeaderboardCard user={user} key={user._id} />)}
      </Grid>
    </Box>
  )
}
export default LeaderboardPage;
