import * as types from "../../types/actionTypes";
import axios from "axios";
import { backendUrl } from "../backendUrl";

let url = process.env.REACT_APP_DEV_URL || backendUrl;

export const authStart = () => {
  return { type: types.AUTH_START };
};

export const authSuccess = (token) => {
  return { type: types.AUTH_SUCCESS, token: token };
};

export const authFail = (error) => {
  return { type: types.AUTH_FAIL, error: error };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    dispatch({ type: types.AUTH_CHECK_STATE });
    let token = localStorage.token;
    // console.log("Token:", token);
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return { type: types.AUTH_LOGOUT };
};

export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`${url}/rest-auth/login/`, {
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
        dispatch(
          authFail({
            wrongRequest: error.message,
            badNetwork: error.request,
            errorStatus: error.response
              ? [
                  error.response.data,
                  error.response.status,
                  error.response.headers,
                ]
              : [],
          })
        );
      });
  };
};
export const authSignUp = (username, email, password1, password2) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`${url}/rest-auth/registration/`, {
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
        dispatch(
          authFail({
            wrongRequest: error.message,
            badNetwork: error.request,
            errorStatus: error.response
              ? [
                  error.response.data,
                  error.response.status,
                  error.response.headers,
                ]
              : [],
          })
        );
      });
  };
};
