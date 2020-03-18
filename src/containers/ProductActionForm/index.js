import { Box, Button, Grid, MenuItem, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";
import renderSelectField from "../../components/FormHelpers/SelectField";
import renderTextField from "../../components/FormHelpers/TextField";
import styles from "./styles";
import validate from "./validate";
import * as uiActions from "../../actions/ui";
import * as PDActions from "../../actions/product";
class ProductActionForm extends Component {
  handleSubmitForm = data => {
    const { PDActions, productEditing } = this.props;
    const { addProduct, updateProduct } = PDActions;
    if (productEditing && productEditing.id) {
      updateProduct(data);
    } else {
      addProduct(data);
    }
  };
  render() {
    const {
      classes,
      invalid,
      submitting,
      modalActions,
      handleSubmit
    } = this.props;
    const { hideModal } = modalActions;
    return (
      <form onSubmit={handleSubmit(this.handleSubmitForm)}>
        <Grid container>
          <Grid item md={12}>
            <Field
              id="txtName"
              label="Tên sản phẩm"
              className={classes.TextField}
              name="name"
              component={renderTextField}
            />
          </Grid>
          <Grid item md={12}>
            <Box mt={2}>
              <Field
                id="txtCode"
                label="Mã sản phẩm"
                className={classes.TextField}
                name="code"
                component={renderTextField}
              />
            </Box>
          </Grid>
          <Grid item md={12}>
            <Box mt={2}>
              <Field
                id="imgURL"
                label="URL hình ảnh"
                className={classes.TextField}
                name="image"
                component={renderTextField}
              />
            </Box>
          </Grid>
          <Grid item md={12}>
            <Box mt={2}>
              <Field
                id="txtPrice"
                label="Giá sản phẩm"
                className={classes.TextField}
                component={renderTextField}
                name="price"
              />
            </Box>
          </Grid>

          <Grid item md={12}>
            <Box mt={4}>
              <Field
                id="gender"
                label="Trạng thái"
                className={classes.selectField}
                name="gender"
                component={renderSelectField}
              >
                <MenuItem value={true}>Nam</MenuItem>
                <MenuItem value={false}>Nữ</MenuItem>
              </Field>
            </Box>
          </Grid>
          <Grid item md={12}>
            <Box mt={2}>
              <Field
                id="txaDesc"
                name="description"
                label="Mô tả"
                multiline
                rows="4"
                className={classes.TextField}
                component={renderTextField}
              />
            </Box>
          </Grid>

          <Grid item md={12}>
            <Box flexDirection="row-reverse" display="flex" mt={3}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={invalid || submitting}
              >
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
const FORM_NAME = "PRODUCT_MANAGEMENT";
const withReduxForm = reduxForm({
  form: FORM_NAME,
  validate
});

const mapStateToProps = state => {
  return {
    productEditing: state.product.productEditing,
    initialValues: state.product.productEditing
  };
};
const mapDispatchToProps = dispatch => {
  return {
    modalActions: bindActionCreators(uiActions, dispatch),
    PDActions: bindActionCreators(PDActions, dispatch)
  };
};
ProductActionForm.propTypes = {
  classes: PropTypes.object,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  modalActions: PropTypes.shape({
    hideModal: PropTypes.func
  }),
  PDActions: PropTypes.shape({
    addProduct: PropTypes.func
  }),
  productEditing: PropTypes.object
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(
  withConnect,
  withReduxForm,
  withStyles(styles)
)(ProductActionForm);
