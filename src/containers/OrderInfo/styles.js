import { red, green, blue } from "@material-ui/core/colors";
const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    marginTop: 30
  },
  section1: {
    margin: theme.spacing(3, 2)
  },
  section2: {
    margin: theme.spacing(2)
  },
  section3: {
    margin: theme.spacing(3, 2)
  },
  section4: {
    margin: theme.spacing(2)
  },
  status: {
    color: "red",
    textTransform: "uppercase"
  },
  orderID: {
    color: "#3989c6"
  },
  orName: {
    color: "#3989c6",
    fontWeight: 700,
    textTransform: "uppercase"
  },
  tbHead: {
    backgroundColor: theme.color.grey2,
    color: "black",
    textTransform: "uppercase",
    borderBottom: "3px solid #6b6b47"
  },
  icon: {
    marginRight: 5,
    marginTop: 5
  },
  initPrice: {
    background: "#ddd"
  },
  totalPrice: {
    background: "#3989c6",
    color: 'white',
    fontWeiht : 500,
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
  btnHidden:{
    display: 'none'
  }
});

export default styles;
