import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {
  ApartmentOutlined,
  HomeFilled,
  LoginOutlined,
  LogoutOutlined, PlusOutlined,
  SettingFilled, TableOutlined,
  UserAddOutlined,
  UserOutlined
} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, Link} from 'react-router-dom';
import {logout} from "../../redux/actions";
import {Avatar, Box, Button, Grid} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  homeButton: {
   color: 'white'
  },
  iconStyle: {
    marginRight: 5,
  },
  avatarStyle: {
    marginRight: 5,
    border: `2px solid white`
  },
  title: {
    flexGrow: 1,
  },
  navContainer: {
    flex: 1
  }
}));
const Header = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const {isLoggedIn, profile} = useSelector(state => state.user);
    const {profilePicture, firstname, lastname} = profile;
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = (to) => {
      setAnchorEl(null);
      if (to === '/logout') {
        dispatch(logout());
      } else {
        history.push(to);
      }
    };
    const renderMenuItems = () => {
      const authItems = [
        {path: '/sign-in', text: 'Sign In', icon: <LoginOutlined />},
        {path: '/sign-up', text: 'Sign Up', icon: <UserAddOutlined />}
      ];
      const loggedInItems = [
        {path: '/profile', text: 'My Profile', icon: <UserOutlined />},
        // {path: '/settings', text: 'Account Settings', icon: <SettingFilled />},
        {path: '/logout', text: 'Logout', icon: <LogoutOutlined />},
      ];
      let menuItems = isLoggedIn ? loggedInItems : authItems;
      return menuItems.map((item, index) => {
        return (
          <MenuItem onClick={() => handleClose(item.path)} key={index}>
            {item.icon} <Box ml={1}>{item.text}</Box>
          </MenuItem>
        )
      })
    }
    return (
      <div className={classes.root}>
        <AppBar position="static" variant={'elevation'}>
          <Toolbar>
            <Link to={'/'} edge="start">
              <Button variant={'text'} className={classes.homeButton} onClick={()=>{}}>
                <HomeFilled size={24} className={classes.iconStyle} /> Would you rather?
              </Button>
            </Link>
            <Grid container className={classes.navContainer} justify={'center'} alignItems={'center'} spacing={3}>
              <Grid item>
                <Link to={'/'}>
                  <Button className={classes.homeButton}><HomeFilled className={classes.iconStyle}/> Home</Button>
                </Link>
              </Grid>
              {
                isLoggedIn &&
                <Grid item>
                  <Link to={'/polls/add'}>
                    <Button className={classes.homeButton}><PlusOutlined className={classes.iconStyle}/> Create
                      Poll</Button>
                  </Link>
                </Grid>
              }
              <Grid item>
                <Link to={'/leaderboard'}>
                  <Button className={classes.homeButton}><ApartmentOutlined className={classes.iconStyle}/> Leaderboard</Button>
                </Link>
              </Grid>
              {
                isLoggedIn &&
                <Grid item>
                  <Link to={'/my-polls'}>
                    <Button className={classes.homeButton}><TableOutlined className={classes.iconStyle}/> My Polls</Button>
                  </Link>
                </Grid>
              }
            </Grid>
            <Box ml={'auto'}>
              {
                isLoggedIn &&
                  <Button className={classes.homeButton} onClick={() => handleClose('/profile')} variant={'text'}>
                    <Avatar alt={`${firstname}'s Profile Picture`} src={profilePicture} className={classes.avatarStyle}/> {firstname} {lastname}
                  </Button>
              }
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <UserOutlined />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                {renderMenuItems()}
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </div>
);
}
export default Header;
