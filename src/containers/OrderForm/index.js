import { Box, Button, Grid, MenuItem, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { bindActionCreators, compose } from "redux";
import { Field, reduxForm } from "redux-form";
import * as odActions from "../../actions/orders";
import * as uiActions from "../../actions/ui";
import renderSelectField from "../../components/FormHelpers/SelectField";
import renderTextField from "../../components/FormHelpers/TextField";
import styles from "./styles";
import PropTypes from "prop-types";
class OrderForm extends Component {
  handleSubmitForm = data => {
    const { odActions, history, orderSelected } = this.props;
    const { updateStatusOrder } = odActions;
    if (orderSelected && orderSelected.id) {
      updateStatusOrder(data);
    }
    history.goBack();
  };
  render() {
    const { classes, handleSubmit, modalActions } = this.props;
    const { hideModal } = modalActions;
    return (
      <form onSubmit={handleSubmit(this.handleSubmitForm)}>
        <Grid container>
          <Grid item md={12}>
            <Field
              label="Mã đơn hàng"
              id="orderID"
              className={classes.TextField}
              name="orderID"
              component={renderTextField}
              variant="filled"
            />
          </Grid>
          <Grid item md={12}>
            <Box mt={1}>
              <Field
                id="status"
                label="Trạng thái"
                className={classes.selectField}
                name="status"
                component={renderSelectField}
              >
                <MenuItem value={0}>CHƯA XÁC NHẬN</MenuItem>
                <MenuItem value={1}>XÁC NHẬN ĐƠN HÀNG</MenuItem>
              </Field>
            </Box>
          </Grid>

          <Grid item md={12}>
            <Box flexDirection="row-reverse" display="flex" mt={3}>
              <Button variant="contained" color="primary" type="submit">
                Lưu lại
              </Button>
              <Box mr={1}>
                <Button variant="contained" color="default" onClick={hideModal}>
                  Hủy bỏ
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </form>
    );
  }
}
OrderForm.propTypes = {
  odActions: PropTypes.shape({
    updateStatusOrder: PropTypes.func
  }),
  history: PropTypes.object,
  orderSelected: PropTypes.object,
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
  modalActions: PropTypes.shape({
    hideModal: PropTypes.func
  })
};
const FORM_NAME = "ORDER_STATUS";
const withReduxForm = reduxForm({
  form: FORM_NAME
});
const mapStateToProps = state => {
  return {
    orderSelected: state.orders.orderSelected,
    initialValues: state.orders.orderSelected
  };
};
const mapDispatchToProps = dispatch => {
  return {
    modalActions: bindActionCreators(uiActions, dispatch),
    odActions: bindActionCreators(odActions, dispatch)
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(
  withConnect,
  withRouter,
  withReduxForm,
  withStyles(styles)
)(OrderForm);
