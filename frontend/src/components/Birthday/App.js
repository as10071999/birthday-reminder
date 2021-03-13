import { useState, useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authCheckState, logout } from "../../actions/auth/authActions";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Home from "../Birthday/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { backendUrl } from "../../actions/backendUrl";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
function App() {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  /* States */
  const isAuthenticated = useSelector((state) => {
    return state.auth.token ? true : false;
  }, shallowEqual);
  //console.log("IS Authenticated", isAuthenticated);

  /* UseEffect */
  useEffect(() => {
    // console.log("Checking Auth State From App");
    dispatch(authCheckState());
    async function fetchMyAPI() {
      let url = `${backendUrl}/rest-auth/user/`;
      console.log("Token", token);
      let response = await axios.get(url, {
        headers: { Authorization: "Token " + token },
      });

      console.log("User Data", response.data);
    }
    if (token) fetchMyAPI();
    // console.log("Dispatched From App");
  });
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => {
              history.push("/");
            }}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Happy Birthday
          </Typography>

          {!isAuthenticated ? (
            <Button
              color="inherit"
              onClick={() => {
                history.push("/login");
              }}
            >
              Login
            </Button>
          ) : (
            <Button
              color="inherit"
              onClick={() => {
                dispatch(logout());
              }}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </>
  );
}

export default App;
