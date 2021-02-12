import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "fontsource-roboto";
import { CssBaseline } from "@material-ui/core";
ReactDOM.render(
  <React.StrictMode>
    <App />
    <CssBaseline />
  </React.StrictMode>,
  document.getElementById("root")
);
