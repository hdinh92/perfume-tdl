const styles = theme => ({
  paper: {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    position: "absolute",
    width: 800,
    backgroundColor: theme.palette.background.paper,
    outline: "none"
  },
  TextField: {
    width: "100%"
  },
  header: {
    backgroundColor: theme.color.primaryColor,
    padding: theme.spacing(2),
    color: "white",
    textAlign: "center"
  },
  title: { textTransform: "uppercase", fontWeight: 700 },
  content: {
    padding: theme.spacing(2)
  },
  selectField: {
    display: "flex",
    flexWrap: "wrap"
  }
});

export default styles;
