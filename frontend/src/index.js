import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "fontsource-roboto";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Provider } from "react-redux";
import store from "./store";
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <CssBaseline />
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
