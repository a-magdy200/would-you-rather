import React from "react";
import {ToggleButtonGroup, ToggleButton} from '@material-ui/lab';
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {useDispatch, useSelector} from "react-redux";
import {filterPolls} from "../../redux/actions";
const styles = makeStyles({
  filterContainerStyle: {
    marginBottom: 20
  }
})
const Filter = () => {
  const classes = styles();
  const {filterBy} = useSelector(state => state.polls);
  const {_id} = useSelector(state => state.user.profile);
  const dispatch = useDispatch();
  const onButtonClick = (e, value) => {
    if (value !== filterBy) {
      dispatch(filterPolls(value, _id));
    }
  }
  return (
    <Grid container alignItems={'center'} justify={'center'} className={classes.filterContainerStyle}>

    <ToggleButtonGroup
      value={filterBy}
      exclusive
      onChange={onButtonClick}
      aria-label="filter polls"
    >
      <ToggleButton value="top">
        Top
      </ToggleButton>
      <ToggleButton value="latest">
        Latest
      </ToggleButton>
      <ToggleButton value="answered">
        Answered
      </ToggleButton>
      <ToggleButton value="unanswered">
        Unanswered
      </ToggleButton>
    </ToggleButtonGroup>
    </Grid>
  )
}
export default Filter;
