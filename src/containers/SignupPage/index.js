import { Avatar, Button, Container, CssBaseline, Grid, Typography, withStyles } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { Field, reduxForm } from "redux-form";
import renderCheckbox from "../../components/FormHelpers/CheckBox";
import renderTextField from "../../components/FormHelpers/TextField";
import * as auActions from "./../../actions/auth";
import styles from "./styles";
import validate from "./validate";
import PropTypes from "prop-types";
class SignupPage extends Component {
  handleSubmitForm = (data) => {
    const { auActions,history } = this.props;
    const { signUp } = auActions;
    signUp(data);
    history.push('/signin')
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
            Đăng ký
          </Typography>
          <form
            className={classes.form}
            onSubmit={handleSubmit(this.handleSubmitForm)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Field
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  fullWidth
                  id="firstName"
                  label="Tên người dùng"
                  autoFocus
                  component={renderTextField}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Địa chỉ Email"
                  name="email"
                  autoComplete="email"
                  component={renderTextField}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  variant="outlined"
                  fullWidth
                  name="password"
                  label="Mật khẩu"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  component={renderTextField}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="checkbox"
                  component={renderCheckbox}
                  color="primary"
                  label="Đồng ý điều khoản"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={invalid || submitting}
            >
              Đăng ký
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/signin" className={classes.link}>
                  <Button>Đã có tài khoản? Đăng nhập</Button>
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}


SignupPage.propTypes = {
  auActions: PropTypes.shape({
    loginSuccess: PropTypes.func
  }),
  history: PropTypes.object,
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool
};
const FORM_NAME = "SIGNUP_FORM";
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
)(SignupPage);
