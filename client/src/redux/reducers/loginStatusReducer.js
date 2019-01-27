import { LOGIN_SUCCESS, LOGIN_FAILURE, LOG_OUT_USER } from "../actionTypes";

const defaultState = {
  loggedIn: false
};

function loginStatusReducer(state = defaultState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return { ...state, loggedIn: true, loggedInUser: payload };
    case LOGIN_FAILURE:
      return { loggedIn: false };
    case LOG_OUT_USER:
      return { loggedIn: false };
    default:
      return state;
  }
}

export default loginStatusReducer;
