import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authSignUp } from "../../actions/auth/authActions";
import { useHistory } from "react-router-dom";

import {
  Paper,
  Grid,
  TextField,
  Button,
  makeStyles,
  Container,
  FormControl,
  InputLabel,
  FormHelperText,
  InputAdornment,
  Input,
} from "@material-ui/core";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Face, Fingerprint } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(1),
  },
}));
export default function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    showPassword: false,
    showPasswordConfirm: false,
  });
  const [error, setError] = useState({
    username: false,
    email: false,
    password: false,
    passwordConfirm: false,
    usernameMsg: "",
    emailMsg: "",
    passwordMsg: "",
    passwordConfirmMsg: "",
  });
  console.log("Form Data", form);

  const handleClickShowPassword = () => {
    setForm({ ...form, showPassword: !form.showPassword });
  };
  const handleClickShowPasswordConfirm = () => {
    setForm({ ...form, showPasswordConfirm: !form.showPasswordConfirm });
  };

  const handleInputFieldChange = (event, name) => {
    const { target } = event;
    setForm({ ...form, [name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
    let errorFound = false;
    let error = {
      username: false,
      email: false,
      password: false,
      passwordConfirm: false,
      usernameMsg: "",
      emailMsg: "",
      passwordMsg: "",
      passwordConfirmMsg: "",
    };
    if (!form.username) {
      error.username = true;
      error.usernameMsg = "Username is required";
      errorFound = true;
    }
    if (!form.email) {
      error.email = true;
      error.emailMsg = "Email is required";
      errorFound = true;
    }
    if (!form.password) {
      error.password = true;
      error.passwordMsg = "Password is required";
      errorFound = true;
    } else {
      if (!form.passwordConfirm) {
        error.passwordConfirm = true;
        error.passwordConfirmMsg = "Confirm your password";
        errorFound = true;
      } else {
        if (form.passwordConfirm != form.password) {
          error.passwordConfirm = true;
          error.passwordConfirmMsg = "Those passwords didn’t match. Try again.";
          errorFound = true;
        }
      }
    }
    setError({ ...error });
    if (!errorFound) {
      dispatch(authSignUp(form.username, form.email, form.password));
    }
    console.log("Dispatched");
  };
  return (
    <Container maxWidth="sm">
      <Paper className={classes.padding}>
        <form className={classes.margin}>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Face />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField
                id="username"
                label="Username"
                type="text"
                error={error.username}
                helperText={error.usernameMsg}
                fullWidth
                autoFocus
                onChange={(event) => handleInputFieldChange(event, "username")}
              />
            </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <AlternateEmailIcon />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField
                id="email"
                label="Email"
                type="email"
                error={error.email}
                helperText={error.emailMsg}
                fullWidth
                autoFocus
                onChange={(event) => handleInputFieldChange(event, "email")}
              />
            </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Fingerprint />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <FormControl fullWidth error={error.password}>
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={form.showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(event) =>
                    handleInputFieldChange(event, "password")
                  }
                  fullWidth
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {form.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {error.password && (
                  <FormHelperText>{error.passwordMsg}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Fingerprint />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <FormControl fullWidth error={error.passwordConfirm}>
                <InputLabel htmlFor="standard-adornment-password">
                  Confirm Password
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={form.showPasswordConfirm ? "text" : "password"}
                  value={form.passwordConfirm}
                  onChange={(event) =>
                    handleInputFieldChange(event, "passwordConfirm")
                  }
                  fullWidth
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPasswordConfirm}
                      >
                        {form.showPasswordConfirm ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {error.passwordConfirm && (
                  <FormHelperText>{error.passwordConfirmMsg}</FormHelperText>
                )}
              </FormControl>
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
                onClick={handleSubmit}
              >
                Register
              </Button>
            </Grid>
            <Grid item>
              or
              <Button
                color="secondary"
                style={{ textTransform: "none" }}
                onClick={() => {
                  history.push("/login");
                }}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
