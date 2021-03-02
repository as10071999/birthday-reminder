import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/Birthday/App";
import "fontsource-roboto";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <CssBaseline />
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
