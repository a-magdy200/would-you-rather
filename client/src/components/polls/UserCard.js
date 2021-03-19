import {Box, Card, CardContent, CardMedia, Chip, Grid, Typography} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/styles";
import moment from "moment";
import {MAIN_COLOR} from "../../config/theme";
import PropTypes from 'prop-types';
const styles = makeStyles({
  userCardContainerStyle: {
  },
  userImageContainerStyle: {
    height: 300,
    width: 250
  },
  userNameStyle: {
    textTransform: 'capitalize'
  },
  cardHeader: {
    borderBottom: `2px solid ${MAIN_COLOR}`,
    textTransform: 'capitalize',
  },
  cardContentContainer: {},
  userContainer: {
    borderRight: `2px solid ${MAIN_COLOR}`
  },
  badgeStyle: {
    top: -5,
    right: -4,
    position: 'absolute',
    height: 40,
    width: 40,
    borderRadius: 20
  },
  userDataContainer: {
    flex: 1,
    position: 'relative'
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
const UserCard = ({user, isProfile = false, createdAt}) => {
  const {profilePicture, firstname, lastname, score} = user;
  const classes = styles();
  return (
    <Grid item className={classes.userCardContainerStyle}>
      <Card variant={'elevation'}>
        <CardMedia className={classes.userImageContainerStyle} image={profilePicture} src={profilePicture} />
        <CardContent>
          <Typography className={classes.cardHeader} variant={'h5'} gutterBottom={true}>{firstname} {lastname}</Typography>
          <Typography gutterBottom={true} variant={'subtitle2'}>Score: <Chip color={'primary'} size={'medium'} label={score}/></Typography>
          {
            isProfile?
              <Grid className={classes.userDataContainer} item>
                <Typography gutterBottom={true}>Polls Created: <strong>{user.createdPolls.length}</strong></Typography>
                <Typography gutterBottom={true}>Polls Answered: <strong>{user.answeredPolls.length}</strong></Typography>
              </Grid>
              :
              <Typography
                className={classes.userNameStyle}
                variant={'subtitle2'}>
                Created At: {moment(createdAt).format('YYYY/MM/DD HH:MMA')}
              </Typography>
          }
        </CardContent>
      </Card>
    </Grid>
  )
}
UserCard.prototype = {
  isProfile: PropTypes.bool,
  createdAt: PropTypes.string.isRequired,
  user:{
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    profilePicture: PropTypes.string,
    score: PropTypes.number
  }
}
export default UserCard;
