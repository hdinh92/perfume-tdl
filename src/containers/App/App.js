import React, { Component } from "react";
import { ThemeProvider } from "@material-ui/core";
import theme from "../../commons/Theme/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import configureStore from "./../../redux/configureStore";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import AdminLayoutRoute from "../../components/Layout/AdminLayoutRoute";
import { ADMIN_ROUTES, ROUTES } from "../../constants/routes";
import CssBaseline from "@material-ui/core/CssBaseline";
import GlobalLoading from "../../components/GlobalLoading";
import ModalComponent from "../../components/ModalComponent";
import DefaultLayoutRoute from "../../components/Layout/DefaultLayoutRoute";
const store = configureStore();
class App extends Component {
  renderAdminRoute() {
    let xhtml = null;
    xhtml = ADMIN_ROUTES.map((route, index) => {
      return (
        <AdminLayoutRoute
          key={route.path}
          path={route.path}
          component={route.component}
          exact={route.exact}
          name={route.name}
        />
      );
    });
    return xhtml;
  }
  renderDefaultRoute() {
    let xhtml = null;
    xhtml = ROUTES.map((route, index) => {
      return (
        <DefaultLayoutRoute
          key={route.path}
          path={route.path}
          component={route.component}
          exact={route.exact}
          name={route.name}
        />
      );
    });
    return xhtml;
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <ThemeProvider theme={theme}>
            <CssBaseline>
              <ToastContainer
                position="top-right"
                autoClose={2000}
                newestOnTop={false}
                closeOnClick
                pauseOnVisibilityChange
                draggable
                pauseOnHover={false}
              />
              <GlobalLoading />
              <ModalComponent />
              <Switch>
                {this.renderAdminRoute()}
                {this.renderDefaultRoute()}
              </Switch>
            </CssBaseline>
          </ThemeProvider>
        </Router>
      </Provider>
    );
  }
}
export default (App);
