import { Button, Grid, withStyles } from "@material-ui/core";
import BuildIcon from "@material-ui/icons/Build";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import OrderList from "../../components/OrdersComponent/OrderList";
import SearchOrder from "../../components/OrdersComponent/SearchOrder";
import * as odActions from "./../../actions/orders";
import styles from "./styles";
class Orders extends Component {
  state = {
    rowsPerPage: 5,
    page: 0
  };
  
  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage
    });
  };
  handleChangeRowsPerPage = event => {
    this.setState({
      page: 0,
      rowsPerPage: event.target.value
    });
  };
  openOrderTab = () => {
 
  };
  handleFilterOrder = e => {
    const {odActions} = this.props
    const {filterOrder} = odActions
    filterOrder(e.target.value)
  };
  render() {
    const { classes, listOrder } = this.props;
    const { rowsPerPage, page } = this.state;
    return (
      <div className={classes.orderBoard}>
        <Grid container spacing={2}>
          <Grid item md={12} xs={12}>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <NavLink to="/admin/orders-table" className={classes.btnLink}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    size="large"
                  >
                    <BuildIcon />
                    <span className={classes.buttonTitle}>
                      Quản lý đơn đặt hàng
                    </span>
                  </Button>
                </NavLink>
              </Grid>
              <Grid item md={6} xs={12}>
                <SearchOrder onFilterProduct={this.handleFilterOrder} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={12} xs={12}>
            <OrderList
              listOrder={listOrder}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
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
Orders.propTypes = {
  classes: PropTypes.object,
  odActions: PropTypes.shape({
    fetchOrders: PropTypes.func,
    filterOrder: PropTypes.func
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
    odActions: bindActionCreators(odActions, dispatch)
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withStyles(styles))(Orders);
