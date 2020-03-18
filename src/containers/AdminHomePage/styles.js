const styles = theme => ({
  adminHomePage: {
    width: "100%",
    backgroundColor: "rgb(247, 249, 252)"
  },
  section1: {
    margin: theme.spacing(0, 2)
  },
  section2: {
    margin: theme.spacing(5, 2)
  },
  section3: {
    margin: theme.spacing(3, 2)
  },
  section4: {
    margin: theme.spacing(2)
  },
  section5: {
    margin: theme.spacing(4,2)
  },
  title: {
    fontSize: "1.4rem",
    fontWeight: 600
  },
  titleDate: {
    marginLeft: 8,
    fontSize: "0.8rem",
    fontWeight: 400
  },
  title1: {
    flex: "1 1 100%",
    padding: "10px 15px"
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  tbHead: {
    backgroundColor: "#3f51b5",
    textTransform: "uppercase",
    color: "white"
  },
  linkTo: {
    "&:hover": {
      textDecoration: "none",
      color: "#800000"
    },
    textDecoration: "none",
    cursor: "pointer"
  },
  root: {
    minWidth: 275,
    minHeight: 160
  },
  cardAction: {
    textAlign: "right"
  },
  male: {
    color: "green",
    fontWeight: 700
  },
  female: {
    color: "red"
  },
  status0:{
    backgroundColor: "#d50000",
    color : 'white',
    textTransform : 'uppercase'
  },
  status1:{
    backgroundColor: "#FFC260",
    color : 'white',
    textTransform : 'uppercase'
  },
  status2:{
    backgroundColor: "#4caf50",
    color : 'white',
    textTransform : 'uppercase'
  },
  pos:{
    color : '#d50000',
    fontWeight : 400,
    fontSize: 16 
  },

  profitArrow: {
    transform: "rotate(-45deg)",
    fill: theme.palette.success.main,
  },
  profitArrowDanger: {
    transform: "rotate(45deg)",
    fill: theme.palette.secondary.main,
  },

});

export default styles;
