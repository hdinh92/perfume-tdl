import { Box, Grid, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import OrderItem from "../OrderItem";
import styles from "./styles";
import PropTypes from "prop-types";
class OrderBoard extends Component {
  render() {
    const {
      classes,
      orderFiltered,
      status,
      onDeleteOrder,
      onEditOrder
    } = this.props;
    return (
      <Grid item md={4} xs={12}>
        <Box mt={2} mb={2} display="flex" justifyContent="center">
          <div className={classes.status}>{status.label}</div>
        </Box>
        <div className={classes.wrapperListTask}>
          {orderFiltered.map(item => {
            return (
              <OrderItem
                item={item}
                status={status}
                key={item.id}
                onDeleteOrder={() => onDeleteOrder(item)}
                onEditOrder={() => onEditOrder(item)}
              />
            );
          })}
        </div>
      </Grid>
    );
  }
}
OrderBoard.propTypes = {
  classes: PropTypes.object,
  orderFiltered: PropTypes.array,
  status: PropTypes.object,
  onDeleteOrder: PropTypes.func,
  onEditOrder: PropTypes.func
};
export default withStyles(styles)(OrderBoard);
