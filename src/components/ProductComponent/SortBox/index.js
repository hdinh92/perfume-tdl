import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  withStyles
} from "@material-ui/core";
import React, { Component } from "react";
import { compose } from "redux";
import styles from "./styles";
import { connect } from "react-redux";
import cn from "classnames";
class SortBox extends Component {
  render() {
    const { classes, handleChange,sortValue,listProduct } = this.props;
    return (
      <FormControl className={classes.formControl}>
        <InputLabel>Lọc theo</InputLabel>
        <Select onChange={handleChange}>
          <MenuItem value="">
            <em>Tất cả</em>
          </MenuItem>
          <MenuItem value={true}>Nam</MenuItem>
          <MenuItem value={false}>Nữ</MenuItem>
        </Select>
        <FormHelperText
          className={cn(classes.sort, { [classes.hidden]: sortValue !== "" })}
        >
          Giới tính
        </FormHelperText>
        <FormHelperText
          className={cn(classes.sort, { [classes.hidden]: sortValue === "" })}
        >
          Có: "<strong>{listProduct.length}</strong>" kết quả
        </FormHelperText>
      </FormControl>
    );
  }
}
const mapStateToProps = state => ({
  listProduct: state.product.listProduct,
  sortValue : state.product.sortValue
});
const mapDispatchToProps = null;
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withStyles(styles))(SortBox);
