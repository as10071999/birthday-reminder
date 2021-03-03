import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { authLogin } from "../../actions/auth/authActions";
import {
  Paper,
  Grid,
  TextField,
  Button,
  makeStyles,
  Container,
  CircularProgress,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Face, Fingerprint } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(1),
  },
}));
export default function Login() {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => {
    if (state.auth.error) {
      if (
        state.auth.error.errorStatus &&
        state.auth.error.errorStatus[1] === 400
      ) {
        return `${
          state.auth.error.errorStatus[0].non_field_errors
            ? state.auth.error.errorStatus[0].non_field_errors
            : ""
        }`;
      } else {
        return state.auth.error.wrongRequest;
      }
    }
  });
  const isAuthenticated = useSelector((state) => {
    return state.auth.token ? true : false;
  }, shallowEqual);
  const [form, setForm] = useState({ username: "", password: "" });

  const handleInputFieldChange = (event, name) => {
    const { target } = event;
    setForm({ ...form, [name]: target.value });
  };
  function handleSubmit(event) {
    event.preventDefault();
    dispatch(authLogin(form.username, form.password));
  }
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated]);
  return (
    <Container maxWidth="sm">
      <Paper className={classes.padding}>
        {error && <Alert severity="error">{error}</Alert>}
        {isLoading ? (
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <CircularProgress />
            </Grid>
            <Grid item xs></Grid>
          </Grid>
        ) : (
          <form className={classes.margin} onSubmit={handleSubmit}>
            <Grid container spacing={8} alignItems="flex-end">
              <Grid item>
                <Face />
              </Grid>
              <Grid item md={true} sm={true} xs={true}>
                <TextField
                  id="username"
                  label="Username"
                  type="text"
                  fullWidth
                  autoFocus
                  required
                  onChange={(event) =>
                    handleInputFieldChange(event, "username")
                  }
                />
              </Grid>
            </Grid>
            <Grid container spacing={8} alignItems="flex-end">
              <Grid item>
                <Fingerprint />
              </Grid>
              <Grid item md={true} sm={true} xs={true}>
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  fullWidth
                  required
                  onChange={(event) =>
                    handleInputFieldChange(event, "password")
                  }
                />
              </Grid>
            </Grid>
            <Grid container alignItems="center" justify="space-between">
              <Grid item xs></Grid>
              <Grid item>
                <Button
                  disableFocusRipple
                  disableRipple
                  style={{ textTransform: "none" }}
                  variant="text"
                  color="primary"
                >
                  Forgot password ?
                </Button>
              </Grid>
            </Grid>
            <Grid
              container
              justify="center"
              style={{ marginTop: "10px" }}
              spacing={2}
            >
              <Grid item>
                {" "}
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ textTransform: "none" }}
                  type="submit"
                >
                  Login
                </Button>
              </Grid>

              <Grid item>
                or
                <Button
                  color="secondary"
                  style={{ textTransform: "none" }}
                  onClick={() => {
                    history.push("/register");
                  }}
                >
                  SignUp
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Paper>
    </Container>
  );
}
