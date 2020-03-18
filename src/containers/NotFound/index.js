import React, { Component } from "react";
import NotFoundIcon from "./../../assets/notfound.gif";
import { withStyles } from "@material-ui/core";
import styles from "./styles";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
class NotFound extends Component {
  render() {
    const user = localStorage.getItem("id_token");
    const { classes, isAuthenticated } = this.props;
    return isAuthenticated || user ? (
      <div className={classes.root}>
        <img src={NotFoundIcon} className={classes.icon} alt="notfound" />
      </div>
    ) : (
      <Redirect
        to={{
          pathname: "/signin"
        }}
      />
    );
  }
}
NotFound.propTypes = {
  classes: PropTypes.func,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

const withConnect = connect(mapStateToProps, null);
export default compose(withConnect, withStyles(styles))(NotFound);
