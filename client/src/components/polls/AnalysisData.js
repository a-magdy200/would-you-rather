import {Badge, Box, Chip, Divider, Typography} from "@material-ui/core";
import React from "react";
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/styles";
const styles = makeStyles({

  buttonContainer: {
    marginBottom: 16,
  },
})
const AnalysisData = ({data}) => {
  const {
    totalAnswersCount,
    option1Count,
    option2Count
  } = data;
  const classes = styles();
  return (
    <Box>
      <Divider className={classes.buttonContainer} />
      <Typography gutterBottom={true}>
        Total Votes: <strong>{totalAnswersCount}</strong>
      </Typography>
      <Typography gutterBottom={true}>
        Option 1 Votes: <Chip color={'primary'} size={'medium'} label={`${(option1Count / totalAnswersCount) * 100}% (${option1Count})` } />
      </Typography>
      <Typography gutterBottom={true}>
        Option 2 Votes: <Chip color={'primary'} size={'medium'} label={`${(option2Count / totalAnswersCount) * 100}% (${option2Count})` } />
      </Typography>
    </Box>
  )
}
AnalysisData.prototype = {
  data: {
    totalAnswersCount: PropTypes.number,
    option1Count: PropTypes.number,
    option2Count: PropTypes.number,
  }
}
export default AnalysisData;
