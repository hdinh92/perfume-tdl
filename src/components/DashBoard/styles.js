const styles = theme => ({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    height: "100vh"
  },
  wrapperContent: {
    width: "100%",
    padding: 10,
    transition: theme.transitions.create('margin',{
      easing: theme.transitions.easing.shape,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  shiftLeft:{
    marginLeft: -260,
    transition: theme.transitions.create('margin',{
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  modalDelete: {
    textAlign: "center"
  },
  modalTextBold: {
    fontWeight: 700,
    color : 'red'
  },
  modalConfirmDelete:{
    fontSize : 16
  }
});

export default styles;
