import { red, green, blue } from "@material-ui/core/colors";
const styles = theme => ({
  root: {
    maxWidth: 1200,
    marginTop: 10,
    minHeight : 150
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avaReady: {
    backgroundColor: red[500]
  },
  avaInprogress: {
    backgroundColor: blue[500]
  },
  avaCompleted: {
    backgroundColor: green[500]
  },
  txtReady: {
    color: red[500],
    fontWeight: 700
  },
  txtInprogress: {
    color: blue[500],
    fontWeight: 700
  },
  txtCompleted: {
    color: green[500],
    fontWeight: 700
  },
  title: {
    fontWeight: 700
  },
  txtInfo:{
    fontWeight: 700,
    marginLeft: 5,
    textTransform: 'uppercase'
  }



});

export default styles;
