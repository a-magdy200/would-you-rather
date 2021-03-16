import {Fab} from "@material-ui/core";
import {PlusOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import React from "react";
import {makeStyles} from "@material-ui/styles";
import PropTypes from 'prop-types';
const styles = makeStyles({
  floatingActionButtonStyle: {
    position:'fixed',
    bottom: 50,
    right: 50
  },
});

const MyFab = ({to}) => {
const classes = styles();
  return (
    <Link to={to} className={classes.floatingActionButtonStyle}>
      <Fab color="primary" aria-label="add">
        <PlusOutlined />
      </Fab>
    </Link>
  )
}
MyFab.prototype = {
  to: PropTypes.string.isRequired
}
export default MyFab
