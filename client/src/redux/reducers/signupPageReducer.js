import {
  UPDATE_SIGNUP_USERNAME,
  UPDATE_SIGNUP_PASSWORD,
  UPDATE_SIGNUP_CONFIRM_PASSWORD
} from "../actionTypes";

const defaultStore = {
  signupCredentials: {
    username: "",
    password: "",
    confirmPassword: ""
  }
};

function signupPageReducer(state = defaultStore, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_SIGNUP_USERNAME:
      return {
        ...state,
        signupCredentials: { ...state.signupCredentials, username: payload }
      };
    case UPDATE_SIGNUP_PASSWORD:
      return {
        ...state,
        signupCredentials: { ...state.signupCredentials, password: payload }
      };
    case UPDATE_SIGNUP_CONFIRM_PASSWORD:
      return {
        ...state,
        signupCredentials: {
          ...state.signupCredentials,
          confirmPassword: payload
        }
      };
    default:
      return state;
  }
}

export default signupPageReducer;
