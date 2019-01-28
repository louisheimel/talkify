import axios from "axios";

import {
  UPDATE_LOGIN_USERNAME,
  UPDATE_LOGIN_PASSWORD,
  UPDATE_SIGNUP_USERNAME,
  UPDATE_SIGNUP_PASSWORD,
  UPDATE_SIGNUP_CONFIRM_PASSWORD,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOG_OUT_USER,
  CHANGE_WORKSPACE
} from "../actionTypes";

import {
  createSocketConnection,
  waitForSuccessfulLogin
} from "../../socketSetup";

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
    createSocketConnection()
      .then(waitForSuccessfulLogin(loginData))
      .then(() => {
        dispatch(loginSuccess());
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

export const logOutUser = () => ({
  type: LOG_OUT_USER
});

export const logOut = () => {
  return dispatch => {
    dispatch(logOutUser());

    // TODO: sever socket.io connection to server
  };
};

export const changeWorkspace = workspace => ({
  type: CHANGE_WORKSPACE,
  payload: workspace
});
