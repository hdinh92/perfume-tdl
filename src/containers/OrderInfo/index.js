import { Box, Button, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import BackspaceIcon from "@material-ui/icons/Backspace";
import CheckIcon from "@material-ui/icons/Check";
import HistoryIcon from "@material-ui/icons/History";
import cn from "classnames";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { bindActionCreators, compose } from "redux";
import * as odActions from "../../actions/orders";
import * as uiActions from "../../actions/ui";
import OrderForm from "../OrderForm";
import styles from "./styles";

class OrderInfo extends Component {
  handleBack = () => {
    const { history, odActions } = this.props;
    const { orderSelected } = odActions;

    orderSelected(null);
    history.goBack();
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
  handleDeleteOrder = order => {
    const { odActions, history } = this.props;
    const { deleteOrder } = odActions;
    deleteOrder(order.id);
    history.push(`/orders-table`);
  };
  handleUpdateStatus = data => {
    const { modalActions, odActions } = this.props;
    const {
      showModal,
      changeModalContent,
      changeModalTitle
    } = modalActions;
    const { orderSelected } = odActions;
    orderSelected(data);
    showModal();
    changeModalTitle("Cập nhật status");
    changeModalContent(<OrderForm/>);
  };

  render() {
    const { classes, order, history } = this.props;
    if (order) {
      const renderStatus =
        order.status === 0
          ? "Đơn hàng chưa xác nhận"
          : order.status === 1
          ? "Đã xác nhận đơn hàng"
          : "Đơn hàng hoàn thành";
      return (
        <CssBaseline>
          <div className={classes.orderInfo}>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={this.handleBack}
              className={classes.btnText}
            >
              <HistoryIcon /> <span className={classes.btnText}>Quay lại</span>
            </Button>
            <div className={classes.root}>
              <div className={classes.section1}>
                <Grid container spacing={2}>
                  <Grid item md={12} xs={12}>
                    <Grid container spacing={2}>
                      <Grid item md={6}>
                        <Box
                          fontSize={26}
                          fontWeight={500}
                          mt={5}
                          ml={1}
                          letterSpacing={1}
                        >
                          ĐƠN ĐẶT HÀNG
                        </Box>
                      </Grid>
                      <Grid item md={6}>
                        <Box
                          textAlign="right"
                          mt={1}
                          fontSize={16}
                          lineHeight={1.5}
                        >
                          <span className={classes.orName}>
                            {order.customer.name}
                          </span>
                          <br />
                          Địa chỉ:{" "}
                          <span className={classes.orderID}>
                            {order.customer.add}
                          </span>{" "}
                          <br />
                          Số điện thoại:{" "}
                          <span className={classes.orderID}>
                            {order.customer.phone}
                          </span>
                          <br />
                          Email:{" "}
                          <span className={classes.orderID}>
                            {order.customer.email}
                          </span>
                          <br />
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
              <Divider variant="middle" />
              <div className={classes.section2}>
                <Grid container spacing={2}>
                  <Grid item md={12} xs={12}>
                    <Grid container spacing={2}>
                      <Grid item md={6}>
                        <Box mb={1} fontSize={14}>
                          Trạng thái:
                        </Box>
                        <Box fontWeight={500} fontSize={16}>
                          <span
                            className={cn(classes.txtReady, {
                              [classes.txtInprogress]: order.status === 1,
                              [classes.txtCompleted]: order.status === 2
                            })}
                          >
                            {renderStatus}
                          </span>
                        </Box>
                      </Grid>
                      <Grid item md={6}>
                        <Box textAlign="right">
                          <Box mb={1} fontWeight={700} fontSize={24}>
                            MÃ ĐƠN HÀNG:{" "}
                            <span className={classes.orderID}>
                              {order.orderID}
                            </span>
                          </Box>
                          <Box fontWeight={700}>
                            Ngày đặt hàng:{" "}
                            <span className={classes.orderID}>
                              {order.orderDate}
                            </span>
                            <br />
                            Giá trị đơn hàng:{" "}
                            <span className={classes.orderID}>
                              {" "}
                              {this.format_curency(
                                this.showTotalAmount(order.item)
                              )}
                              VNĐ
                            </span>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
              <div className={classes.section3}>
                <Grid container spacing={2}>
                  <Grid item md={12} xs={12}>
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        aria-label="customized table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell className={classes.tbHead}>#</TableCell>
                            <TableCell className={classes.tbHead} align="right">
                              Tên sản phẩm
                            </TableCell>
                            <TableCell className={classes.tbHead} align="right">
                              Đơn giá&nbsp;(VNĐ)
                            </TableCell>
                            <TableCell className={classes.tbHead} align="right">
                              Số lượng&nbsp;(c)
                            </TableCell>
                            <TableCell className={classes.tbHead} align="right">
                              Thành tiền&nbsp;(VNĐ)
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>{this.showCartItem(order.item)}</TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid item md={10}>
                    <Box textAlign="right" fontSize={20}>
                      <span className={classes.orName}>TỔNG THÀNH TIỀN: </span>
                    </Box>
                  </Grid>
                  <Grid item md={2}>
                    <Box textAlign="right" fontSize={20} mr={2}>
                      <span className={classes.orName}>
                        {" "}
                        {this.format_curency(this.showTotalAmount(order.item))}
                      </span>
                    </Box>
                  </Grid>
                </Grid>
              </div>
              <Divider variant="middle" />
              <div className={classes.section4}>
                <Grid container spacing={2}>
                  <Grid item md={12} xs={12}>
                    <Box display="flex" justifyContent="flex-end">
                      <Box mr={5}>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => this.openDeleteModal(order)}
                          className={cn(classes.btnDel, {
                            [classes.btnHidden]: order.status === 2
                          })}
                        >
                          <span className={classes.icon}>
                            <BackspaceIcon />
                          </span>{" "}
                          HỦY ĐƠN HÀNG
                        </Button>
                      </Box>
                      <Box ml={5}>{() => this.renderButton(order)}</Box>
                    </Box>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </CssBaseline>
      );
    }
    history.push(`/admin/orders-table`);
    return <div></div>;
  }
  renderButton = order => {
    let xhtml = null;
    const { classes } = this.props;
    const { status } = order;
    if (status === 0) {
      xhtml = (
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.handleUpdateStatus(order)}
        >
          <span className={classes.icon}>
            <CheckIcon />
          </span>
          XÁC NHẬN ĐƠN HÀNG
        </Button>
      );
    } else {
      xhtml = (
        <Button variant="contained" color="primary" onClick={this.handleBack}>
          <span className={classes.icon}>
            <CheckIcon />
          </span>
          ĐỒNG Ý
        </Button>
      );
    }
    return xhtml;
  };
  format_curency = price => {
    return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };
  showSubTotal = (price, quan) => {
    return this.format_curency(price * quan);
  };
  showTotalAmount = item => {
    var total = 0;
    if (item.length > 0) {
      for (var i = 0; i < item.length; i++) {
        total += item[i].product.price * item[i].quantity;
      }
    }
    return total;
  };
  showCartItem = item => {
    const { classes } = this.props;
    var result = null;
    result = item.map((val, index) => {
      return (
        <TableRow hover key={index}>
          <TableCell component="th" scope="row" className={classes.totalPrice}>
            {index + 1}
          </TableCell>
          <TableCell align="right">{val.product.name}</TableCell>
          <TableCell align="right" className={classes.initPrice}>
            {this.format_curency(val.product.price)}
          </TableCell>
          <TableCell align="right">{val.quantity}</TableCell>
          <TableCell align="right" className={classes.totalPrice}>
            {this.showSubTotal(val.product.price, val.quantity)}
          </TableCell>
        </TableRow>
      );
    });
    return result;
  };
}
OrderInfo.propTypes = {
  classes: PropTypes.object,
  odActions: PropTypes.shape({
    orderSelected: PropTypes.func,
    deleteOrder: PropTypes.func,
    updateStatusOrder: PropTypes.func
  }),
  history: PropTypes.object,
  order: PropTypes.object,
  modalActions: PropTypes.shape({
    showModal: PropTypes.func,
    hideModal: PropTypes.func,
    changeModalContent: PropTypes.func,
    changeModalTitle: PropTypes.func
  })
};
const mapStateToProps = state => {
  return {
    order: state.orders.orderSelected
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
)(OrderInfo);
