import React from "react";
import {Avatar, Button, Card, CardContent, CardHeader, Grid, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/styles";
import {MAIN_COLOR} from "../../config/theme";
import PropTypes from 'prop-types';
const styles = makeStyles({
  cardHeader: {
    borderBottom: `2px solid ${MAIN_COLOR}`,
    textTransform: 'capitalize',
    backgroundColor: `${MAIN_COLOR}20`
  },
  cardContentContainer: {},
  userContainer: {
    borderRight: `2px solid ${MAIN_COLOR}`
  },
  pollDataContainer: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 16,
    display: 'block'
  },
  avatarStyle: {
    height: 100,
    width: 100
  },
})
const PollCard = ({poll}) => {
  const classes = styles();
  const {title, createdBy, _id} = poll;
  const {firstname, lastname, profilePicture} = createdBy || {};
  return (
    <Grid item md={8} lg={7} xl={7} sm={10} xs={12}>
      <Link to={`/polls/${_id}`}>
        <Card variant={"elevation"}>
          <CardHeader className={classes.cardHeader} title={`${firstname || ''} ${lastname || ''} Asked...`}/>
          <CardContent className={classes.cardContentContainer}>
            <Grid container justify={'center'} alignItems={'center'} spacing={2}>
              <Grid className={classes.userContainer} item>
                <Avatar className={classes.avatarStyle} sizes={'large'} variant={"square"} src={profilePicture} />
              </Grid>
              <Grid className={classes.pollDataContainer} item>
                <Typography gutterBottom={true}>{title || 'Would you rather...?'}</Typography>
              </Grid>
            </Grid>
            <Button variant={'contained'} className={classes.buttonContainer} color={'primary'} fullWidth={true}>
              View Poll
            </Button>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  )
}
PollCard.prototype = {
  title: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  createdBy: {
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    profilePicture: PropTypes.string,
  }
}
export default PollCard;
