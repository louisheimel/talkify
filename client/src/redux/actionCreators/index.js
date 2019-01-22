import axios from "axios";

import {
  UPDATE_LOGIN_USERNAME,
  UPDATE_LOGIN_PASSWORD,
  UPDATE_SIGNUP_USERNAME,
  UPDATE_SIGNUP_PASSWORD,
  UPDATE_SIGNUP_CONFIRM_PASSWORD,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
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
  console.log("inside request login, loginData is: ", loginData);
  return dispatch => {
    axios
      .post("http://localhost:3001/api/login", loginData)
      .then(data => {
        dispatch(loginSuccess(data));
      })
      .catch(err => {
        dispatch(loginFailure(err));
      });
  };
};
