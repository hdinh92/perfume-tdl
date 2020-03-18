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
import Order from "../Order";
import styles from "./styles";
import PropTypes from "prop-types";
class OrderList extends Component {
  render() {
    const {
      classes,
      rowsPerPage,
      listOrder,
      page,
      onChangePage,
      onChangeRowsPerPage
    } = this.props;
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tbHead}>ID</TableCell>
              <TableCell className={classes.tbHead} align="center">
                Tên khách hàng
              </TableCell>
              <TableCell className={classes.tbHead} align="center">
                Mã đặt hàng
              </TableCell>
              <TableCell className={classes.tbHead} align="center">
                Ngày đặt hàng
              </TableCell>
              <TableCell className={classes.tbHead} align="center">
                Trạng thái
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? listOrder.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : listOrder
            ).map((order, index) => (
              <Order
                order={order}
                index={index}
                key={order.id}
                // onEditOrder={() => {onEditOrder(order)}}
                // onDeleteOrder={() => {onDeleteOrder(order)}}
              />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, { label: "Tất cả", value: -1 }]}
                colSpan={6}
                count={listOrder.length}
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
OrderList.propTypes = {
  classes: PropTypes.object,
  rowsPerPage: PropTypes.number,
  listOrder: PropTypes.array,
  page: PropTypes.number,
  onChangePage: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func,
  onEditOrder: PropTypes.func,
  onDeleteOrder: PropTypes.func
};
export default withStyles(styles)(OrderList);
