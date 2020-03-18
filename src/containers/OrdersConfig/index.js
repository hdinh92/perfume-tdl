import {
  Button,
  Card,
  CardContent,
  Grid,
  withStyles,
  Box
} from "@material-ui/core";
import HistoryIcon from "@material-ui/icons/History";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import OrderBoard from "../../components/OrderBoard/OrderBoard";
import OrderSearch from "../../components/OrderBoard/OrderSearch";
import { ORDER_STATUS } from "../../constants/orders";
import * as odActions from "./../../actions/orders";
import styles from "./styles";
import * as uiActions from "../../actions/ui";

import { withRouter } from "react-router";
class OrdersConfig extends Component {
  renderOrderBoard = () => {
    let xhtml = null;
    const { listOrder } = this.props;
    xhtml = (
      <Grid container spacing={2}>
        {ORDER_STATUS.map(status => {
          const orderFiltered = listOrder.filter(
            order => order.status === status.value
          );
          return (
            <OrderBoard
              orderFiltered={orderFiltered}
              status={status}
              key={status.value}
              onDeleteOrder={this.openDeleteModal}
              onEditOrder={this.handleEditOrder}
            />
          );
        })}
      </Grid>
    );
    return xhtml;
  };
  renderOrderSearch() {
    let xhtml = null;
    xhtml = <OrderSearch onFilterProduct={this.handleFilterOrder} />;
    return xhtml;
  }
  handleFilterOrder = e => {
    const { odActions } = this.props;
    const { filterOrder } = odActions;
    filterOrder(e.target.value);
  };
  handleEditOrder = order => {
    const { odActions, history } = this.props;
    const { orderSelected } = odActions;
    orderSelected(order);
    history.push(`/admin/orders-table/${order.id}`);
  };
  handleDeleteOrder = order => {
    const { odActions } = this.props;
    const { deleteOrder } = odActions;
    deleteOrder(order.id);
  };
  openDeleteModal = order => {
    const { modalActions, classes } = this.props;
    const {
      showModal,
      hideModal,
      changeModalContent,
      changeModalTitle
    } = modalActions;
    showModal();
    changeModalTitle("Hủy đơn hàng");
    changeModalContent(
      <div className={classes.modalDelete}>
        <div className={classes.modalConfirmDelete}>
          Hủy đơn hàng <span className={classes.txtTitle}>{order.orderID}</span>
        </div>
        <Box display="flex" flexDirection="row-reverse" mt={2}>
          <Box ml={1}>
            <Button variant="contained" onClick={hideModal}>
              Hủy bỏ
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.handleDeleteOrder(order)}
            >
              Đồng ý
            </Button>
          </Box>
        </Box>
      </div>
    );
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.ordersConfig}>
        <Grid container spacing={2}>
          <Grid item md={12} xs={12}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item md={2} xs={12}>
                    <NavLink className={classes.btn} to="/orders">
                      <Button variant="outlined" color="primary" size="small">
                        <HistoryIcon />{" "}
                        <span className={classes.btnText}>Quay lại</span>
                      </Button>
                    </NavLink>
                  </Grid>
                  <Grid item md={10} xs={12}>
                    <Grid
                      container
                      direction="column"
                      justify="space-between"
                      alignItems="stretch"
                    >
                      <Grid item md={12} xs={12}>
                        {this.renderOrderSearch()}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={12} xs={12}>
            {this.renderOrderBoard()}
          </Grid>
        </Grid>
      </div>
    );
  }
  componentDidMount() {
    const { odActions } = this.props;
    const { fetchOrders } = odActions;
    fetchOrders();
  }
}
OrdersConfig.propTypes = {
  classes: PropTypes.object,
  odActions: PropTypes.shape({
    fetchOrders: PropTypes.func,
    deleteOrder: PropTypes.func
  }),
  listOrder: PropTypes.array
};
const mapStateToProps = state => {
  return {
    listOrder: state.orders.listOrder
  };
};
const mapDispatchToProps = dispatch => {
  return {
    odActions: bindActionCreators(odActions, dispatch),
    modalActions: bindActionCreators(uiActions, dispatch)
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(
  withConnect,
  withRouter,
  withStyles(styles)
)(OrdersConfig);
