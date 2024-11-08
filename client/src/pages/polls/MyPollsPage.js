import React, {useEffect} from "react";
import {
  Box, Button,
  Grid, Typography,
} from "@material-ui/core";
import {getMyPollsRequest} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import PollCard from "../../components/polls/PollCard";
import Loader from "../../components/common/Loader";
import MyFab from "../../components/common/MyFab";
import {Result} from "antd";
import {Link} from "react-router-dom";

const MyPollsPage = () => {
  const dispatch = useDispatch();
  const {myPolls} = useSelector(state => state.polls);
  const {isLoading} = useSelector(state => state.loading);
  useEffect(() => {
    dispatch(getMyPollsRequest());
  }, []);
  if (isLoading) {
    return (
      <Loader/>
    )
  }
  return (
    <Box p={5}>
      <MyFab to={'/polls/add'}/>
      <Grid container alignItems={'center'} justify={'center'} spacing={2}>
        {myPolls.map((poll) => <PollCard poll={poll} key={poll._id} />)}
        {myPolls.length === 0 &&
          <Result
            status="500"
            title={<Typography align={'center'} variant={'h5'} gutterBottom={true}>Oops!</Typography>}
            subTitle={<Typography align={'center'} variant={'h6'} gutterBottom={true}>You haven't created any polls...</Typography>}
            extra={<Link to={'/polls/add'}>
              <Grid container justify={'center'}>
                <Button color={"primary"} variant={'contained'}>Create the first one?</Button>
              </Grid>
            </Link>}
          />}
      </Grid>
    </Box>
  )
}
export default MyPollsPage;
