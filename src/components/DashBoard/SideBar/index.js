import { Drawer, ListItemIcon, withStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import HomeIcon from "@material-ui/icons/Home";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styles from "./styles";
const menus = [
  {
    name: "TRANG CHÍNH",
    to: "/",
    exact: true,
    icon: <HomeIcon />
  },
  {
    name: "QUẢN LÝ SẢN PHẨM",
    to: "/admin/task-board",
    exact: false,
    icon: <FormatListBulletedIcon />
  },
  {
    name: "DANH SÁCH ĐƠN HÀNG",
    to: "/admin/orders",
    exact: false,
    icon: <FormatListBulletedIcon />
  }
];
class SideBar extends Component {
  toggleDrawer = value => {
    const { onToggleSidebar } = this.props;
    if (onToggleSidebar) {
      onToggleSidebar(value);
    }
  };
  renderList() {
    const { classes } = this.props;
    let xhtml = null;
    xhtml = (
      <div className={classes.list}>
        <List component="div" className={classes.root}>
          {menus.map(item => {
            return (
              <NavLink
                to={item.to}
                exact={item.exact}
                className={classes.menuLink}
                activeClassName={classes.menuLinkActive}
                key={item.to}
              >
                <ListItem className={classes.menuItem} button>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {item.name}
                </ListItem>
              </NavLink>
            );
          })}
        </List>
      </div>
    );
    return xhtml;
  }
  render() {
    const { classes, showSidebar } = this.props;
    return (
      <Drawer
        open={showSidebar}
        onClose={() => this.toggleDrawer(false)}
        variant="persistent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        {this.renderList()}
      </Drawer>
    );
  }
}
SideBar.propTypes = {
  classes: PropTypes.object,
  showSidebar: PropTypes.bool,
  onToggleSidebar: PropTypes.func
};
export default withStyles(styles)(SideBar);
