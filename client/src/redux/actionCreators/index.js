import axios from "axios";
import io from "socket.io-client";

import {
  UPDATE_LOGIN_USERNAME,
  UPDATE_LOGIN_PASSWORD,
  UPDATE_SIGNUP_USERNAME,
  UPDATE_SIGNUP_PASSWORD,
  UPDATE_SIGNUP_CONFIRM_PASSWORD,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE
} from "../actionTypes";

export const updateLoginUsername = username => ({
  type: UPDATE_LOGIN_USERNAME,
  payload: username
});
export const updateLoginPassword = password => ({
  type: UPDATE_LOGIN_PASSWORD,
  payload: password
});

export const updateSignupUsername = username => ({
  type: UPDATE_SIGNUP_USERNAME,
  payload: username
});

export const updateSignupPassword = password => ({
  type: UPDATE_SIGNUP_PASSWORD,
  payload: password
});

export const updateSignupConfirmPassword = password => ({
  type: UPDATE_SIGNUP_CONFIRM_PASSWORD,
  payload: password
});

export const loginSuccess = username => ({
  type: LOGIN_SUCCESS,
  payload: username
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE
});

export const requestLogin = loginData => {
  return dispatch => {
    const createSocketConnection = () =>
      new Promise((resolve, reject) => {
        const socket = io("http://localhost:3001");
        socket.on("connect", () => {
          resolve(socket);
        });
      });

    const waitForSuccessfulLogin = socket => {
      return new Promise((resolve, reject) => {
        socket.emit("user login", loginData);
        socket.on("successful login", () => {
          resolve(socket);
        });
      });
    };
    createSocketConnection()
      .then(waitForSuccessfulLogin)
      .then(() => {
        dispatch(data => loginSuccess(data));
      })
      .catch(err => dispatch(loginFailure(err)));
  };
};

export const signupSuccess = data => ({
  type: SIGNUP_SUCCESS
});

export const signupFailure = error => ({
  type: SIGNUP_FAILURE
});

export const requestSignup = signupData => {
  return dispatch => {
    axios
      .post("http://localhost:3001/api/signup", signupData)
      .then(data => {
        dispatch(signupSuccess(data));
      })
      .catch(err => {
        dispatch(signupFailure(err));
      });
  };
};
