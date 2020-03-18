import { withStyles, Box, Button } from "@material-ui/core";
import React, { Component } from "react";
import styles from "./styles";
import Header from "./Header";
import SideBar from "./SideBar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import * as uiActions from "./../../actions/ui";
import * as odActions from "./../../actions/orders";
import * as auActions from "./../../actions/auth";
import cn from "classnames";
import { withRouter } from "react-router";
class DashBoard extends Component {
  handleToggleSidebar = value => {
    const { uiActions } = this.props;
    const { showSidebar, hideSidebar } = uiActions;
    if (value === true) {
      showSidebar();
    } else {
      hideSidebar();
    }
  };
  componentDidMount() {
    const { odActions } = this.props;
    const { fetchOrders } = odActions;
    fetchOrders();
  }
  handleGTOrder = () => {
    const { listOrder, history, uiActions } = this.props;
    const { hideModal } = uiActions;
    const listOrderFilter = listOrder.filter(item => item.status === 0);
    if (listOrderFilter) {
      history.push("/admin/orders-table");
      hideModal();
    }
  };
  openModalGTOrder = () => {
    const { uiActions, classes, listOrder } = this.props;
    const {
      showModal,
      hideModal,
      changeModalContent,
      changeModalTitle
    } = uiActions;
    const listOrderFilter = listOrder.filter(item => item.status === 0);
    showModal();
    changeModalTitle("Xác nhận đơn hàng mới !!!");
    changeModalContent(
      <div className={classes.modalDelete}>
        <div className={classes.modalConfirmDelete}>
          Hiện đang có:
          <span className={classes.modalTextBold}>
            {" "}
            {listOrderFilter.length}{" "}
          </span>{" "}
          đơn hàng mới chưa xác nhận
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
              onClick={this.handleGTOrder}
            >
              Đồng ý
            </Button>
          </Box>
        </Box>
      </div>
    );
  };
  handleLogOut = () => {
    const { history, auActions } = this.props;
    const { signOutSuccess } = auActions;
    if (history) {
      signOutSuccess();
      localStorage.removeItem("id_token");
      history.push("/signin");
    }
  };
  render() {
    const {
      children,
      classes,
      name,
      showSidebar,
      listOrder,
      history
    } = this.props;
    return (
      <div className={classes.dashboard}>
        <Header
          name={name}
          showSidebar={showSidebar}
          onToggleSidebar={this.handleToggleSidebar}
          listOrder={listOrder}
          history={history}
          onHandleGTOrder={this.openModalGTOrder}
          onLogOut={this.handleLogOut}
        />
        <div className={classes.wrapper}>
          <SideBar
            showSidebar={showSidebar}
            onToggleSidebar={this.handleToggleSidebar}
          />
          <div
            className={cn(classes.wrapperContent, {
              [classes.shiftLeft]: showSidebar === false
            })}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}
DashBoard.propTyoes = {
  children: PropTypes.object,
  classes: PropTypes.object,
  showSidebar: PropTypes.bool,
  uiActions: PropTypes.shape({
    showSidebar: PropTypes.func,
    hideSidebar: PropTypes.func
  }),
  listOrder: PropTypes.array,
  odActions: PropTypes.shape({
    fetchOrders: PropTypes.func
  }),
  auActions: PropTypes.shape({
    signOutSuccess: PropTypes.func
  })
};
const mapStateToProps = state => {
  return {
    showSidebar: state.ui.showSidebar,
    listOrder: state.orders.listOrder
  };
};
const mapDispatchToProps = dispatch => {
  return {
    uiActions: bindActionCreators(uiActions, dispatch),
    odActions: bindActionCreators(odActions, dispatch),
    auActions: bindActionCreators(auActions, dispatch)
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withRouter, withStyles(styles))(DashBoard);
