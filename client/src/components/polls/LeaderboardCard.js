import React from "react";
import {Avatar, Card, CardContent, Chip, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {MAIN_COLOR} from "../../config/theme";
const styles = makeStyles({
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
const LeaderboardCard = ({user}) => {
  const {profilePicture, firstname ,lastname, score, createdPolls, answeredPolls} = user;
  const classes = styles();
  return (
    <Grid item md={8} lg={7} xl={7} sm={10} xs={12}>
      <Card variant={"elevation"}>
        <CardContent className={classes.cardContentContainer}>
          <Grid container justify={'center'} alignItems={'center'} spacing={2}>
            <Grid className={classes.userContainer} item>
              <Avatar className={classes.avatarStyle} sizes={'large'} variant={"square"} src={profilePicture} />
            </Grid>
            <Grid className={classes.userDataContainer} item>
              <Chip className={classes.badgeStyle} color={"primary"} size={'medium'} label={score}/>
              <Typography className={classes.cardHeader} variant={'h5'} gutterBottom={true}>{firstname} {lastname}</Typography>
              <Typography gutterBottom={true}>Polls Created: <strong>{createdPolls.length}</strong></Typography>
              <Typography gutterBottom={true}>Polls Answered: <strong>{answeredPolls.length}</strong></Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}
export default LeaderboardCard;
