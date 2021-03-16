import React, {useEffect, useState} from "react";
import {
  Box, Button,
  Grid, Typography,
} from "@material-ui/core";
import {getAllPollsRequest} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import PollCard from "../../components/polls/PollCard";
import Filter from "../../components/polls/Filter";
import Loader from "../../components/common/Loader";
import MyFab from "../../components/common/MyFab";
import {withSnackbar} from "notistack";
import {Link} from "react-router-dom";
import {Result} from "antd";

const HomePage = ({enqueueSnackbar}) => {
  const dispatch = useDispatch();
  const {filteredPolls, polls} = useSelector(state => state.polls);
  const {isLoading} = useSelector(state => state.loading);
  useEffect(() => {
    enqueueSnackbar('Fetching polls...', {variant: 'info'});
    dispatch(getAllPollsRequest());
  }, []);
  if (isLoading) {
    return (
      <Loader/>
    )
  }
  return (
    <Box p={5}>
      <Filter />
      <MyFab to={'/polls/add'}/>
      <Grid container alignItems={'center'} justify={'center'} spacing={2}>
        {filteredPolls.map((poll) => <PollCard poll={poll} key={poll._id} />)}
        {polls.length === 0 ?
          <Result
            status="500"
            title={<Typography align={'center'} variant={'h5'} gutterBottom={true}>Oops!</Typography>}
            subTitle={<Typography align={'center'} variant={'h6'} gutterBottom={true}>No polls in the database yet...</Typography>}
            extra={<Link to={'/polls/add'}>
              <Grid container justify={'center'}>
                <Button color={"primary"} variant={'contained'}>Create the first one?</Button>
              </Grid>
            </Link>}
          />
        :
        filteredPolls.length === 0 && <Typography variant={'subtitle1'}>No polls under this category</Typography>
        }
      </Grid>
    </Box>
  )
}
export default withSnackbar(HomePage);
