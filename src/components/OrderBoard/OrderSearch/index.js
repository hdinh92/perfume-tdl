import React, { Component } from "react";
import { withStyles, TextField } from "@material-ui/core";
import styles from "./styles";
import PropTypes from 'prop-types'
class OrderSearch extends Component {
  render() {
    const { classes, onFilterProduct } = this.props;
    return (
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Tìm kiếm mã đơn hàng"
          variant="outlined"
          className={classes.textField}
          autoComplete="off"
          onChange={onFilterProduct}
        />
      </form>
    );
  }
}
OrderSearch.propTypes ={
  classes: PropTypes.object,
onFilterProduct: PropTypes.func
}
export default withStyles(styles)(OrderSearch);
