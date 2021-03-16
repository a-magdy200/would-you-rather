import {Button, Grid} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/styles";
const styles = makeStyles({

  buttonContainer: {
    marginBottom: 6,
  },
})
const PollButtons = ({options, onOptionClick}) => {
  const classes = styles();
  return (
    <Grid
      className={classes.buttonContainer}
      container
      justify={'space-between'}
      alignItems={'center'}
      spacing={3}>
        <Grid item xs={6}>
          <Button onClick={() => onOptionClick(options[0])} variant={'contained'} color={'primary'} fullWidth={true}>
            Option 1
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button onClick={() => onOptionClick(options[1])} variant={'contained'} color={'secondary'} fullWidth={true}>
            Option 2
          </Button>
        </Grid>
    </Grid>
  )
}
export default PollButtons;
