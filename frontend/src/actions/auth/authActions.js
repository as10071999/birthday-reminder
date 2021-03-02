import * as types from "../../types/actionTypes";
import axios from "axios";
import { backendUrl } from "../backendUrl";

let url = process.env.REACT_APP_DEV_URL || backendUrl;

function authStart() {
  return { type: types.AUTH_START };
}

function authSuccess(token) {
  return { type: types.AUTH_SUCCESS, token: token };
}

function authFail(error) {
  return { type: types.AUTH_FAIL, error: error };
}

function checkAuthTimeout(expirationTime) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
}

function authCheckState() {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess);
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date.getItem()) / 1000
          )
        );
      }
    }
  };
}
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return { type: types.AUTH_LOGOUT };
}

function authLogin(username, password) {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`${url}/rest-auth/login`, {
        username: username,
        password: password,
      })
      .then((res) => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
}
function authSignUp(username, email, password1, password2) {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`${url}/rest-auth/registration`, {
        username: username,
        email: email,
        password1: password1,
        password2: password2,
      })
      .then((res) => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
}
export {
  authFail,
  authLogin,
  authSignUp,
  authStart,
  authSuccess,
  logout,
  checkAuthTimeout,
  authCheckState,
};
