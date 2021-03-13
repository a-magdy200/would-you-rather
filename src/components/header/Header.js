import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {
  HomeFilled,
  LoginOutlined,
  LogoutOutlined,
  SettingFilled,
  UserAddOutlined,
  UserOutlined
} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, Link} from 'react-router-dom';
import {logout} from "../../redux/actions";
import {Box} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  homeButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
const Header = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const {isLoggedIn} = useSelector(state => state.user);

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
        {path: '/settings', text: 'Account Settings', icon: <SettingFilled />},
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
            <Link to={'/'} edge="start" className={classes.homeButton}>
              <IconButton onClick={()=>{}}>
                <HomeFilled size={24} />
              </IconButton>
            </Link>
            <Typography align={'center'} component={'h1'} variant="h3" className={classes.title}>
              Would you rather?
            </Typography>
              <div>
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
              </div>
          </Toolbar>
        </AppBar>
      </div>
);
}
export default Header;
