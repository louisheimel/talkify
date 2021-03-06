import {
  UPDATE_SIGNUP_USERNAME,
  UPDATE_SIGNUP_PASSWORD,
  UPDATE_SIGNUP_CONFIRM_PASSWORD,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE
} from "../actionTypes";

const defaultStore = {
  signupCredentials: {
    username: "",
    password: "",
    confirmPassword: "",
    // TODO: move signedIn property to loginStatusReducer
    signedIn: false,
    showAlertMessage: false,
    alertMessage: "this is an awesome alert message"
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
    case SIGNUP_SUCCESS:
      // TODO: redirect to home page
      return {
        ...state,
        signupCredentials: {
          ...state.signupCredentials,
          signedIn: true
        }
      };
    case SIGNUP_FAILURE:
      // TODO: show alert
      return {
        ...state,
        signupCredentials: {
          ...state.signupCredentials,
          showAlertMessage: true
        }
      };
    default:
      return state;
  }
}

export default signupPageReducer;
