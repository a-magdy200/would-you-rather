import React from "react";
import {Box} from "@material-ui/core";
import {Link} from "react-router-dom";
const HomePage = () => {
  return (
    <Box>
      <h1>Home Page</h1>
      <Link to={'/polls'}>All Polls</Link>
      <Link to={'/polls/create'}>Create Poll</Link>
      <Link to={'/leaderboards'}>Leaderboards</Link>
    </Box>
  )
}
export default HomePage;
