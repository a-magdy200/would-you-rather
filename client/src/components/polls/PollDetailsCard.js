import React from "react";
import {Avatar, Box, Button, Card, CardContent, CardHeader, Divider, Grid, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/styles";
import {MAIN_COLOR} from "../../config/theme";
import {BorderOutlined, StarFilled, StarOutlined} from "@ant-design/icons";
import AnalysisData from "./AnalysisData";
import PollButtons from "./PollButtons";
import YouMustLogin from "../common/YouMustLogin";
import AnswerDetails from "./AnswerDetails";
import PropTypes from 'prop-types';
import _ from 'lodash';

const styles = makeStyles({
  cardHeader: {
    borderBottom: `2px solid ${MAIN_COLOR}`,
    textTransform: 'capitalize',
    backgroundColor: `${MAIN_COLOR}20`
  },
  title: {
    textTransform: 'capitalize',
  },
  containerStyle: {
    flex: 1
  },
  userContainer: {
    borderRight: `2px solid ${MAIN_COLOR}`
  },
  pollDataContainer: {
    flex: 1,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  iconStyle: {
    marginRight: 10
  },
})
const PollDetailsCard = ({pollDetails, answerDetails, isLoggedIn, onOptionClick}) => {
  const classes = styles();
  const {title, option1, option2, totalAnswersCount, option1Count, option2Count} = pollDetails;
  return (
    <Grid className={classes.containerStyle} item={true} >
        <Card variant={"elevation"}>
          <CardHeader className={classes.cardHeader} title={'Would you rather...?'}/>
          <CardContent>
            <Typography className={classes.title} gutterBottom={true} variant={'h5'}>{title}</Typography>
            <Typography className={classes.title} gutterBottom={true} variant={'h6'}>
              {answerDetails?.answer === option1 ? <StarFilled className={classes.iconStyle} /> : <StarOutlined className={classes.iconStyle} />}
              {option1}
            </Typography>
            <Typography className={classes.title} gutterBottom={true} variant={'h6'}>
              {answerDetails?.answer === option2 ? <StarFilled className={classes.iconStyle} /> : <StarOutlined className={classes.iconStyle} />}
              {option2}
            </Typography>
            <Divider className={classes.buttonContainer} />
            {
              !_.isEmpty(answerDetails) ?
                <AnswerDetails answerDetails={answerDetails} />
                : isLoggedIn ?
                  <PollButtons options={[option1, option2]} onOptionClick={onOptionClick} />
                  : <YouMustLogin to={'answer to this poll'} />
            }
            <AnalysisData data={{
              totalAnswersCount,
              option1Count,
              option2Count,
            }} />
          </CardContent>
        </Card>
    </Grid>
  )
}
PollDetailsCard.prototype = {
  pollDetails: {
    title: PropTypes.string.isRequired,
    option1: PropTypes.string.isRequired,
    option2: PropTypes.string.isRequired,
    totalAnswersCount: PropTypes.number.isRequired,
    option1Count: PropTypes.number.isRequired,
    option2Count: PropTypes.number.isRequired
  },
  answerDetails: {
    answer: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
  },
  isLoggedIn: PropTypes.bool.isRequired,
  onOptionClick: PropTypes.func.isRequired
}
export default PollDetailsCard;
