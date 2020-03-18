import { withStyles, Badge } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import React, { Component } from "react";
import styles from "./styles";
import PropTypes from "prop-types";
import NotificationsIcon from "@material-ui/icons/Notifications";

import { compose } from "redux";
const menuId = "primary-search-account-menu";
const mobileMenuId = "primary-search-account-menu-mobile";

class Header extends Component {
  state = {
    mobileMoreAnchorEl: null,
    anchorEl: null
  };
  handleProfileMenuOpen = e => {
    this.setState({
      anchorEl: e.currentTarget
    });
  };
  handleMobileMenuOpen = e => {
    this.setState({
      mobileMoreAnchorEl: e.currentTarget
    });
  };
  handleMobileMenuClose = () => {
    this.setState({
      mobileMoreAnchorEl: null
    });
  };
  handleMenuClose = () => {
    this.setState({
      anchorEl: null
    });
    this.handleMobileMenuClose();
  };
 
  renderMobileMenu = () => {
    const { mobileMoreAnchorEl } = this.state;
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    return (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );
  };

  renderMenu = () => {
    const {onLogOut} = this.props
    const { anchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);
    return (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={onLogOut}>Log out</MenuItem>
      </Menu>
    );
  };
  handleToggleSidebar = () => {
    const { showSidebar, onToggleSidebar } = this.props;
    if (onToggleSidebar) {
      onToggleSidebar(!showSidebar);
    }
  };

  render() {
    const { classes, name, listOrder, onHandleGTOrder } = this.props;
    const listOrderFilter = listOrder.filter(item => item.status === 0);

    return (
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleToggleSidebar}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              {name}
            </Typography>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={onHandleGTOrder}
              >
                <Badge
                  badgeContent={listOrderFilter ? listOrderFilter.length : null}
                  color="secondary"
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {this.renderMobileMenu()}
        {this.renderMenu()}
      </div>
    );
  }
}
Header.propTypes = {
  showSidebar: PropTypes.bool,
  onToggleSidebar: PropTypes.func,
  classes: PropTypes.object,
  name: PropTypes.string,
  listOrder: PropTypes.array,
  onHandleGTOrder: PropTypes.func
};
export default compose(withStyles(styles))(Header);
