import { TableFooter, withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import React, { Component } from "react";
import Product from "../Product";
import styles from "./styles";
import PropTypes from "prop-types";
class ProductList extends Component {
  render() {
    const {
      classes,
      rowsPerPage,
      products,
      page,
      onChangePage,
      onChangeRowsPerPage,
      onDeleteProduct,
      onEditProduct
    } = this.props;
    return (
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          aria-label="custom pagination table"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <TableCell className={classes.tbHead}>ID</TableCell>
              <TableCell className={classes.tbHead} align="center">
                Tên sản phẩm
              </TableCell>
              <TableCell className={classes.tbHead} align="center">
                CODE
              </TableCell>
              <TableCell className={classes.tbHead} align="center">
                Giới tính
              </TableCell>
              <TableCell className={classes.tbHead} align="center">
                Giá
              </TableCell>
              <TableCell className={classes.tbHead} align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? products.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : products
            ).map((product, index) => (
              <Product
                product={product}
                index={index}
                key={product.id}
                onDeleteProduct={() => onDeleteProduct(product)}
                onEditProduct={() => onEditProduct(product)}
              />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, { label: "Tất cả", value: -1 }]}
                colSpan={6}
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={onChangePage}
                onChangeRowsPerPage={onChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    );
  }
}
ProductList.propTypes = {
  classes: PropTypes.object,
  rowsPerPage: PropTypes.number,
  products: PropTypes.array,
  page: PropTypes.number,
  onChangePage: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func,
  onDeleteProduct: PropTypes.func,
  onEditProduct: PropTypes.func
};
export default withStyles(styles)(ProductList);
