import React, { Component } from "react";
import { withStyles, Modal } from "@material-ui/core";
import styles from "./styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import * as uiActions from "../../actions/ui";
class ModalComponent extends Component {
  render() {
    const { classes, open, modalActions, component, title } = this.props;
    const {hideModal} = modalActions
    return (
      <Modal open={open} onClose={hideModal} className={classes.root}>
        <div className={classes.paper}>
          <div className={classes.header}>
            <span className={classes.title}>{title}</span>
          </div>
          <div className={classes.content}>{component}</div>
        </div>
      </Modal>
    );
  }
}
ModalComponent.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  component: PropTypes.object,
  title: PropTypes.string,
  modalActions:PropTypes.shape({
      hideModal: PropTypes.func 
  })
};
const mapStateToProps = state => {
  return {
    open: state.ui.showModal,
    component: state.ui.component,
    title: state.ui.title
  };
};
const mapDispatchToProps = dispatch => ({
    modalActions: bindActionCreators(uiActions, dispatch)
})
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withStyles(styles))(ModalComponent);
