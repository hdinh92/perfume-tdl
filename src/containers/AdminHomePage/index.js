import { Box, Button, Card, CardActions, CardContent, Chip, Divider, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, withStyles } from "@material-ui/core";
import CachedIcon from "@material-ui/icons/Cached";
import cn from "classnames";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as odActions from "../../actions/orders";
import * as PDActions from "../../actions/product";
import {Link} from 'react-router-dom'
import styles from "./styles";
class AdminHomePage extends Component {
  componentDidMount() {
    const { PDActions, odActions } = this.props;
    const { fetchAllProduct } = PDActions;
    const { fetchOrders } = odActions;
    fetchAllProduct();
    fetchOrders();
  }
  format_curency = price => {
    return price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };
  reloadData = () => {
    const { PDActions, odActions } = this.props;
    const { fetchAllProduct } = PDActions;
    const { fetchOrders } = odActions;
    fetchAllProduct();
    fetchOrders();
  };
  renderProduct = products => {
    const { classes } = this.props;
    let xhtml = null;
    xhtml = products.map((product, index) => {
      return (
        <TableRow key={product.id}>
          <TableCell component="th" scope="row">
            {index + 1}
          </TableCell>
          <TableCell align="right">{product.name}</TableCell>
          <TableCell align="right">
            {this.format_curency(product.price)}
          </TableCell>
          <TableCell align="right">{product.inventory}</TableCell>
          <TableCell
            className={cn(classes.male, {
              [classes.female]: product.gender === false
            })}
            align="right"
          >
            {product.gender ? "Nam" : "Nữ"}
          </TableCell>
        </TableRow>
      );
    });
    return xhtml;
  };
  renderOrder = orders => {
    const { classes } = this.props;
    let xhtml = null;
    xhtml = orders.map((order, index) => {
      return (
        <TableRow key={order.id}>
          <TableCell component="th" scope="row">
            {index + 1}
          </TableCell>
          <TableCell align="right">{order.customer.name}</TableCell>
          <TableCell align="right">{order.orderID}</TableCell>
          <TableCell align="right">{order.orderDate}</TableCell>
          <TableCell align="right">
            <Chip
              className={cn(classes.status0, {
                [classes.status1]: order.status === 1,
                [classes.status2]: order.status === 2
              })}
              label={
                order.status === 0
                  ? "Chưa xác nhận"
                  : order.status === 1
                  ? "Đã xác nhận"
                  : "Hoàn thành"
              }
            ></Chip>
          </TableCell>
        </TableRow>
      );
    });
    return xhtml;
  };
  render() {
    const { classes, listProduct, listOrder } = this.props;
    const products = listProduct.slice(-5);
    const orders = listOrder.slice(-5);
    const date = new Date().toLocaleDateString("en-GB");
    return (
      <div className={classes.adminHomePage}>
        <div className={classes.section1}>
          <Grid container>
            <Grid item md={6}>
              <Box>
                <h3 className={classes.title}>
                  Xin chào
                  <span className={classes.titleDate}>{date}</span>
                </h3>
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box textAlign="right" mt={3}>
                <IconButton aria-label="refresh" onClick={this.reloadData}>
                  <CachedIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Divider variant="middle" />
        <div className={classes.section2}>
          <Grid container spacing={2}>
            <Grid item md={4} xs={12}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    Tổng số sản phẩm
                  </Typography>
                  <Typography variant="h5" component="h2"></Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {listProduct.length}
                  </Typography>
                </CardContent>
                <CardActions className={classes.cardAction}>
                  <Button size="small">Xem thêm</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item md={4} xs={12}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    Tổng số đơn hàng
                  </Typography>
                  <Typography variant="h5" component="h2"></Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {listOrder.length}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Xem thêm</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item md={4} xs={12}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    Đơn hàng đã hoàn thành
                  </Typography>
                  <Typography variant="h5" component="h2"></Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {listOrder.filter(x => x.status === 2).length}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Xem thêm</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </div>
        <Divider variant="middle" />
        <div className={classes.section3}>
          <Grid container>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography
                  className={classes.title1}
                  variant="h6"
                  id="tableTitle"
                >
                  Sản phẩm (5 sản phẩm thêm mới gần nhất)
                </Typography>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.tbHead} align="left">
                          STT
                        </TableCell>
                        <TableCell className={classes.tbHead} align="right">
                          Tên sản phẩm
                        </TableCell>
                        <TableCell className={classes.tbHead} align="right">
                          Giá&nbsp;(VNĐ)
                        </TableCell>
                        <TableCell className={classes.tbHead} align="right">
                          Tồn kho&nbsp;(c)
                        </TableCell>
                        <TableCell className={classes.tbHead} align="right">
                          Phân loại
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>{this.renderProduct(products)}</TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
          <Box textAlign="right">
            <Link to="/admin/task-board" className={classes.linkTo}>
              {" "}
              <Button>xem thêm >>></Button>
            </Link>
          </Box>
        </div>
        <Divider variant="middle" />
        <div className={classes.section4}>
          <Grid container>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography
                  className={classes.title1}
                  variant="h6"
                  id="tableTitle"
                >
                  Đơn đặt hàng ( 5 đơn đặt hàng gần nhất)
                </Typography>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.tbHead} align="left">
                          ID
                        </TableCell>
                        <TableCell className={classes.tbHead} align="right">
                          Tên khách hàng
                        </TableCell>
                        <TableCell className={classes.tbHead} align="right">
                          Mã đơn hàng
                        </TableCell>
                        <TableCell className={classes.tbHead} align="right">
                          Ngày đặt hàng
                        </TableCell>
                        <TableCell className={classes.tbHead} align="right">
                          Trạng thái
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>{this.renderOrder(orders)}</TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
          <Box textAlign="right">
            <Link to="/admin/orders" className={classes.linkTo}>
            <Button>xem thêm >>></Button>
            </Link>
          </Box>
        </div>

    
      </div>
    );
  }
}
AdminHomePage.propTypes = {
  classes: PropTypes.object,
  PDActions: PropTypes.shape({
    fetchAllProduct: PropTypes.func
  }),
  odActions: PropTypes.shape({
    fetchOrders: PropTypes.func
  }),
  listProduct: PropTypes.array,
  listOrder: PropTypes.array
};
const mapStateToProps = state => {
  return {
    listProduct: state.product.listProduct,
    listOrder: state.orders.listOrder
  };
};
const mapDispatchToProps = dispatch => {
  return {
    PDActions: bindActionCreators(PDActions, dispatch),
    odActions: bindActionCreators(odActions, dispatch)
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withStyles(styles))(AdminHomePage);
