import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import styles from "./styles";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import cn from "classnames";
import { connect } from "react-redux";
import { compose } from "redux";
class SearchOrder extends Component {
  render() {
    const { classes, onFilterProduct, keyword } = this.props;
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
        <div
          className={cn(classes.filter, {
            [classes.hidden]: keyword === ""
          })}
        >
          Bạn đang tìm kiếm: "<strong>{keyword}</strong>"
        </div>
      </form>
    );
  }
}
SearchOrder.propTypes = {
  classes: PropTypes.object,
  onFilterProduct: PropTypes.func,
  keyword: PropTypes.string
};
const mapStateToProps = state => {
  return {
    keyword: state.orders.keyword
  };
};
const withConnect = connect(mapStateToProps, null);
export default compose(withConnect, withStyles(styles))(SearchOrder);
