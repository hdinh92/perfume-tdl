import { withStyles, TableRow, TableCell, IconButton } from "@material-ui/core";
import React, { Component } from "react";
import styles from "./styles";
import cn from "classnames";
import CreateIcon from "@material-ui/icons/Create";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import PropTypes from "prop-types";
class Product extends Component {
  format_curency = price => {
    return price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };
  render() {
    const {
      product,
      classes,
      onDeleteProduct,
      onEditProduct
    } = this.props;
    const genderName = product.gender ? "Nam" : "Nữ";
    return (
      <TableRow key={product.name} hover>
        <TableCell component="th" scope="row">
          {product.id}
        </TableCell>
        <TableCell align="center">{product.name}</TableCell>
        <TableCell align="center">{product.code}</TableCell>
        <TableCell
          align="center"
          className={cn(classes.male, {
            [classes.female]: product.gender === false
          })}
        >
          {genderName}
        </TableCell>
        <TableCell align="center">
          {this.format_curency(product.price)}
        </TableCell>
        <TableCell align="center">
          <IconButton
            variant="contained"
            aria-label="edit"
            onClick={onEditProduct}
          >
            <CreateIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={onDeleteProduct}>
            <DeleteSweepIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }
}
Product.propTypes = {
  product: PropTypes.object,
  index: PropTypes.number,
  classes: PropTypes.object,
  onDeleteProduct: PropTypes.func,
  onEditProduct: PropTypes.func
};
export default withStyles(styles)(Product);
