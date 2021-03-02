import React from "react";
import {
  Paper,
  withStyles,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  makeStyles,
  Container,
  CircularProgress,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Face, Fingerprint } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

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
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);
  function handleSubmit(event) {
    event.preventDefault();
    alert("Form Submitted");
  }
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
                />
              </Grid>
            </Grid>
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Remember me"
                />
              </Grid>
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
            <Grid container justify="center" style={{ marginTop: "10px" }}>
              <Button
                variant="outlined"
                color="primary"
                style={{ textTransform: "none" }}
                type="submit"
              >
                Login
              </Button>
              <Button
                variant="outlined"
                color="primary"
                style={{ textTransform: "none" }}
                onClick={() => {
                  history.push("/register");
                }}
              >
                SignUp
              </Button>
            </Grid>
          </form>
        )}
      </Paper>
    </Container>
  );
}
