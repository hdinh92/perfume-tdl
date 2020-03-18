import { Avatar, Card, CardActions, CardContent, CardHeader, Collapse, IconButton, Typography, withStyles } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import cn from "classnames";
import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "./styles";
class OrderItem extends Component {
  state = {
    expanded: false
  };
  handleExpandClick = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };
  format_curency = price => {
    return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };
  showTotalAmount = cart => {
    var total = 0;
    if (cart.length > 0) {
      for (var i = 0; i < cart.length; i++) {
        total += cart[i].product.price * cart[i].quantity;
      }
    }
    return total;
  };
  render() {
    const { item, status, classes, onDeleteOrder, onEditOrder } = this.props;
    const { expanded } = this.state;
    return (
      <Card className={classes.root}>
        <CardHeader
          classes={{
            title: classes.title,
            subheader: cn(classes.txtReady, {
              [classes.txtInprogress]: item.status === 1,
              [classes.txtCompleted]: item.status === 2
            })
          }}
          avatar={
            <Avatar
              aria-label="recipe"
              className={cn(classes.avaReady, {
                [classes.avaInprogress]: item.status === 1,
                [classes.avaCompleted]: item.status === 2
              })}
            ></Avatar>
          }
          title={`Mã đơn hàng: ${item.orderID}`} 
          subheader={`${status.label}`} 
        />
        <CardActions disableSpacing>
          <IconButton aria-label="edit" onClick={onEditOrder}>
            <CreateIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={onDeleteOrder}>
            <DeleteSweepIcon />
          </IconButton>
          <IconButton
            className={cn(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              Tên khách hàng:{" "}
              <span className={classes.txtInfo}>{item.customer.name}</span>
            </Typography>
            <Typography paragraph>
              Mã đơn hàng:{" "}
              <span className={classes.txtInfo}>{item.orderID}</span>
            </Typography>
            <Typography paragraph>
              Tình trạng:{" "}
              <span
                className={cn(classes.txtReady, {
                  [classes.txtInprogress]: item.status === 1,
                  [classes.txtCompleted]: item.status === 2
                })}
              >
                {status.label}
              </span>
            </Typography>
            <Typography paragraph>
              Số lượng sản phẩm:{" "}
              <span className={classes.txtInfo}>{item.item.length}</span>
            </Typography>
            <Typography paragraph>
              Giá trị đơn hàng:{" "}
              <span className={classes.txtInfo}>
                {" "}
                {this.format_curency(this.showTotalAmount(item.item))} VNĐ
              </span>
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}
OrderItem.propTypes = {
  item: PropTypes.object,
  status: PropTypes.object,
  classes: PropTypes.object,
  onDeleteOrder: PropTypes.func,
  onEditOrder: PropTypes.func
};
export default withStyles(styles)(OrderItem);
