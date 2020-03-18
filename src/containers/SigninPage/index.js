import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  Typography,
  withStyles
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { Field, reduxForm } from "redux-form";
import renderTextField from "../../components/FormHelpers/TextField";
import * as auActions from "./../../actions/auth";
import styles from "./styles";
import validate from "./validate";
import PropTypes from "prop-types";
class SigninPage extends Component {
  handleSubmitForm = data => {
    const { auActions, history } = this.props;
    const { loginSuccess } = auActions;
    loginSuccess(data);
    setTimeout(() => {
      localStorage.setItem("id_token", "1");
      history.push("/");
    }, 1000);
  };
  render() {
    const { classes, handleSubmit, invalid, submitting } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng nhập
          </Typography>
          <form
            className={classes.form}
            onSubmit={handleSubmit(this.handleSubmitForm)}
          >
            <Field
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              component={renderTextField}
            />
            <Field
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              component={renderTextField}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={invalid || submitting}
            >
              Đăng nhập
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signup" className={classes.link}>
                  <Button> {"Không có tài khoản? Đăng ký"}</Button>
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

SigninPage.propTypes = {
  auActions: PropTypes.shape({
    loginSuccess: PropTypes.func
  }),
  history: PropTypes.object,
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool
};
const FORM_NAME = "SIGNIN_FORM";
const withReduxForm = reduxForm({
  form: FORM_NAME,
  validate
});

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};
const mapDispatchToProps = dispatch => {
  return {
    auActions: bindActionCreators(auActions, dispatch)
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(
  withConnect,
  withReduxForm,
  withRouter,
  withStyles(styles)
)(SigninPage);
