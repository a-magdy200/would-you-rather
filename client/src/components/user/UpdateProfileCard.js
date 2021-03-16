import React, {useRef} from "react";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader, CircularProgress,
  Divider,
  Grid, TextField,
  Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {MAIN_COLOR} from "../../config/theme";
import Validator from "validator";
const styles = makeStyles({
  cardHeader: {
    borderBottom: `2px solid ${MAIN_COLOR}`,
    textTransform: 'capitalize',
  },
  profilePicture: {
    width: 150,
    height: 150
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
});
const labels = {
  firstname: 'First Name',
  lastname: 'Last Name',
  email: 'Email',
  newPassword: 'New Password',
  confirmPassword: 'Confirm Password'
};
const UpdateProfileCard = ({
 onInfoSave,
 onPasswordSave,
 onImageUpload,
 imagePreview,
 info,
 password,
 onInfoInputUpdate,
 onPasswordInputUpdate,
 savingImage,
 savingInfo,
 savingPassword
}) => {
  const imageRef = useRef(null);
  const onUploadButtonClick = () => {
    imageRef.current.click();
  }
  const infoDisabledState = () => {
    return info.firstname === '' || info.lastname === '' || info.email === '' || !Validator.isEmail(info.email) || savingInfo;
  }
  const passwordDisabledState = () => {
    return password.newPassword !== password.confirmPassword || password.newPassword === '' || savingPassword;
  }
  const classes = styles();
  return (
    <Grid className={classes.containerStyle} item={true} >
        <Card variant={"elevation"}>
          <CardHeader className={classes.cardHeader} title={'Edit info...'}/>
          <CardContent>

            <Typography variant={'h5'} className={classes.cardHeader} gutterBottom={true}>Change Profile Picture</Typography>
            <form>
              <input
                ref={imageRef}
                type="file"
                name="profilePicture"
                hidden={true}
                onChange={onImageUpload}/>
            </form>
            <Box position={'relative'}>
              <Grid container justify={'space-between'} alignItems={'center'}>
                <Avatar src={imagePreview} variant={"square"} className={classes.profilePicture} />
                <Button
                  variant={"contained"}
                  color={'primary'}
                  onClick={onUploadButtonClick}
                  disabled={savingImage}>
                  {savingImage && <CircularProgress size={24} className={classes.iconStyle} color={'inherit'}/>}Upload New Image
                </Button>
              </Grid>
            </Box>
            <Box m={2} />
            <Divider />
            <Box m={2} />
            <Typography variant={'h5'} className={classes.cardHeader} gutterBottom={true}>Personal Info</Typography>
            {Object.keys(info).map((key, index) => {
              return <TextField
                label={labels[key]}
                key={key}
                variant={'outlined'}
                margin={"normal"}
                size={'medium'}
                fullWidth={true}
                helperText={'This field is required'}
                required={true}
                value={info[key]}
                onChange={(event) => onInfoInputUpdate(key, event.target.value)}
                name={key}
                placeholder={key}/>
            })}
            <Grid container justify={'center'}>
              <Button
                disabled={infoDisabledState()}
                size={'large'}
                variant={'contained'}
                color={'primary'}
                onClick={onInfoSave}>
                {savingInfo && <CircularProgress size={24} className={classes.iconStyle} color={'inherit'}/>}
                Save Info
              </Button>
            </Grid>
            <Box m={2} />
            <Divider />
            <Box m={2} />
            <Typography variant={'h5'} className={classes.cardHeader} gutterBottom={true}>Reset Password</Typography>
            {Object.keys(password).map((key, index) => {
              return <TextField
                label={labels[key]}
                key={key}
                variant={'outlined'}
                margin={"normal"}
                size={'medium'}
                type={'password'}
                fullWidth={true}
                helperText={'This field is required'}
                required={true}
                value={info[key]}
                onChange={(event) => onPasswordInputUpdate(key, event.target.value)}
                name={key}
                placeholder={'Your password...'}/>
            })}
            <Grid container justify={'center'}>
              <Button
                disabled={passwordDisabledState()}
                size={'large'}
                variant={'contained'}
                color={'primary'}
                onClick={onPasswordSave}>
                {savingPassword && <CircularProgress size={24} className={classes.iconStyle} color={'inherit'}/>}
                Change Password
              </Button>
            </Grid>
            <Box m={2} />
          </CardContent>
        </Card>
    </Grid>
  )
}
export default UpdateProfileCard;
