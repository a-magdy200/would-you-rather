import {Button, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

const YouMustLogin = ({to}) => {
  return (
    <Box>
      <Typography>You must login to {to}</Typography>
      <Link to={'/sign-in'}>
        <Button variant={'contained'} color={'primary'}>Login</Button>
      </Link>
    </Box>
  )
}
export default YouMustLogin;
