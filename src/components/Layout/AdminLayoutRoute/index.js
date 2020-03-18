import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import styles from "./styles";
import { Route } from "react-router-dom";
import DashBoard from "../../DashBoard";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
class AdminLayoutRoute extends Component {
  render() {
    const user = localStorage.getItem("id_token")
    const {
      isAuthenticated,
      component: YourComponent,
      ...remainProps
    } = this.props;
    return (
      <Route
        {...remainProps}
        render={routerProps =>
          (isAuthenticated || user) ? (
            <DashBoard {...remainProps}>
              <YourComponent {...routerProps} />
            </DashBoard>
          ) : (
            <Redirect
              to={{
                pathname: "/signin"
              }}
            />
          )
        }
      ></Route>
    );
  }
}
AdminLayoutRoute.propTypes = {
  path: PropTypes.string,
  exact: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  name: PropTypes.string
};
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};
const withConnect = connect(mapStateToProps, null);
export default compose(withConnect, withStyles(styles))(AdminLayoutRoute);
