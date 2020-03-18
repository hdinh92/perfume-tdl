import { withStyles, TableRow, TableCell } from "@material-ui/core";
import React, { Component } from "react";
import styles from "./styles";
import cn from "classnames";
// import CreateIcon from "@material-ui/icons/Create";
// import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import PropTypes from "prop-types";
class Order extends Component {
  render() {
    const { order, classes } = this.props;
    return (
      <TableRow key={order.orderID} hover>
        <TableCell component="th" scope="row">
          {order.id}
        </TableCell>
        <TableCell align="center">{order.customer.name}</TableCell>
        <TableCell align="center">{order.orderID}</TableCell>
        <TableCell align="center">{order.orderDate}</TableCell>
        <TableCell
          align="center"
          className={cn(classes.ready, {
            [classes.inprogress]: order.status === 1,
            [classes.completed]: order.status === 2
          })}
        >
          {order.status === 0
            ? " CHƯA XÁC NHẬN"
            : order.status === 1
            ? "ĐÃ XÁC NHẬN"
            : "HOÀN THÀNH"}
        </TableCell>
      </TableRow>
    );
  }
}
Order.propTypes = {
  order: PropTypes.object,
  classes: PropTypes.object,
  onEditOrder: PropTypes.func,
  onDeleteOrder: PropTypes.func
};
export default withStyles(styles)(Order);
