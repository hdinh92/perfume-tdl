import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import styles from "./styles";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
class DefaultLayoutRoute extends Component {
  render() {
    const { component: YourComponent, ...remainProps } = this.props;
    return (
      <Route
        {...remainProps}
        render={routerProps => {
          return <YourComponent {...routerProps} />;
        }}
      ></Route>
    );
  }
}
DefaultLayoutRoute.propTypes = {
  path: PropTypes.string,
  exact: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  name: PropTypes.string
};
export default withStyles(styles)(DefaultLayoutRoute);
