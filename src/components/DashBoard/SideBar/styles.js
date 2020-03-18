const styles = theme => ({
  drawerPaper: {
    width: 260,
    maxWidth: 260,
    zIndex: 10,
    height: "100%",
    position: "relative"
  },
  menuLink: {
    textDecoration: "none",
    color: "black",
  },
  menuLinkActive: {
    '&>div': {
      backgroundColor: 'rgba(0,0,0,0.15)',
    },
  }
});

export default styles;
