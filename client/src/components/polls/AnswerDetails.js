import {Box, Typography} from "@material-ui/core";
import moment from "moment";
import { BorderlessTableOutlined} from "@ant-design/icons";

const AnswerDetails = ({answerDetails}) => {
  const {answer, createdAt} = answerDetails;
  return (
    <Box mb={2}>
      <Typography>Your Answer</Typography>
      <Typography variant={'subtitle1'}><BorderlessTableOutlined /> {answer}</Typography>
      <Typography gutterBottom={true}>On: {moment(createdAt).format('YYYY/MM/DD HH:MMA')}</Typography>
    </Box>
  )
}
export default AnswerDetails;