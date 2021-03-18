import React, {useEffect, useState} from "react";
import {Box, Grid} from "@material-ui/core";
import UserCard from "../../components/polls/UserCard";
import {useDispatch, useSelector} from "react-redux";
import UpdateProfileCard from "../../components/user/UpdateProfileCard";
import {withSnackbar} from "notistack";
import {changePasswordRequest, saveInfoRequest, uploadImageRequest} from "../../redux/actions";
const MyProfilePage = ({enqueueSnackbar}) => {
  const {
    profile,
    savingImage,
    savingInfo,
    savingPassword
  } = useSelector(state => state.user);
  const [loaders, setLoaders] = useState({info: '', password: '', image: ''});
  let {firstname, lastname, email, profilePicture} = profile;
  const [info, setInfo] = useState({
    firstname,
    lastname,
    email
  });
  const [password, setPassword] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [imagePreview, setImagePreview] = useState(profilePicture);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!savingInfo && loaders.info === 'loading') {
      enqueueSnackbar('Info Updated Successfully.', {variant: 'success'});
      setLoaders({...loaders, info: ''});
    }
    if (!savingImage && loaders.image === 'loading') {
      enqueueSnackbar('Image Uploaded Successfully.', {variant: 'success'});
      setLoaders({...loaders, image: ''});
    }
    if (!savingPassword && loaders.password === 'loading') {
      setPassword({newPassword: '', confirmPassword: ''});
      enqueueSnackbar('Password Changed Successfully.', {variant: 'success'});
      setLoaders({...loaders, password: ''});
    }
  }, [savingImage, savingInfo, savingPassword]);
  const onInfoInputUpdate = (key, value) => {
    setInfo({...info, [key]: value});
  }
  const onPasswordInputUpdate = (key, value) => {
    setPassword({...password, [key]: value});
  }
  const onInfoSave = () => {
    dispatch(saveInfoRequest(info));
    setLoaders({...loaders, info : 'loading'});
    enqueueSnackbar('Updating info...', {variant: 'info'})
  };
  const onPasswordSave = () => {
    dispatch(changePasswordRequest(password));
    setLoaders({...loaders, password: 'loading'});
    enqueueSnackbar('Changing password...', {variant: 'info'})
  };
  const onImageUpload = (event) => {
    let newImage = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImagePreview(reader.result);
    });
    reader.readAsDataURL(newImage);
    dispatch(uploadImageRequest(newImage));
    setLoaders({...loaders, image: 'loading'});
    enqueueSnackbar('Uploading...', {variant: 'info'})
  };
  return (
    <Box p={5}>
      <Grid container alignItems={'flex-start'} justify={'center'} spacing={4}>
        <UserCard isProfile={true} user={profile} />
        <UpdateProfileCard
          imagePreview={imagePreview}
          onInfoSave={onInfoSave}
          onPasswordSave={onPasswordSave}
          onImageUpload={onImageUpload}
          info={info}
          password={password}
          onInfoInputUpdate={onInfoInputUpdate}
          onPasswordInputUpdate={onPasswordInputUpdate}
          savingImage={savingImage}
          savingInfo={savingInfo}
          savingPassword={savingPassword}
        />
      </Grid>
    </Box>
  )
}
export default withSnackbar(MyProfilePage);
