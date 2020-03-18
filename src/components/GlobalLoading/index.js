import React, { Component } from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/styles";
import LoadingIcon from "./../../assets/loading.gif";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
class GlobalLoading extends Component {
  render() {
    const { classes, showLoading } = this.props;
    let xhtml = null;
    if (showLoading) {
      xhtml = (
        <div className={classes.globalLoading}>
          <img src={LoadingIcon} className={classes.icon} alt="loading" />
        </div>
      );
    }
    return xhtml;
  }
}
GlobalLoading.propTypes = {
  classes: PropTypes.object,
  showLoading: PropTypes.bool
};
const mapStateToProps = state => {
  return {
    showLoading: state.ui.showLoading
  };
};
const mapDispatchToProps = null;
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withStyles(styles), withConnect)(GlobalLoading);
