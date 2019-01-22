import { LOGIN_SUCCESS, LOGIN_FAILURE } from "../actionTypes";

const defaultState = {
  loggedIn: false
};

function loginStatusReducer(state = defaultState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return { loggedIn: true };
    case LOGIN_FAILURE:
      return { loggedIn: false };
    default:
      return state;
  }
}

export default loginStatusReducer;
