import { UPDATE_LOGIN_USERNAME, UPDATE_LOGIN_PASSWORD } from "../actionTypes";

const defaultState = {
  loginCredentials: {
    username: "",
    password: ""
  }
};

function loginPageReducer(state = defaultState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_LOGIN_USERNAME:
      return {
        ...state,
        loginCredentials: { ...state.loginCredentials, username: payload }
      };
    case UPDATE_LOGIN_PASSWORD:
      return {
        ...state,
        loginCredentials: { ...state.loginCredentials, password: payload }
      };
    default:
      return state;
  }
}
export default loginPageReducer;
