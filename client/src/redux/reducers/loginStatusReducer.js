import { LOGIN_SUCCESS, LOGIN_FAILURE } from "../actionTypes";

const defaultState = {
  loggedIn: false
};

function loginStatusReducer(state = defaultState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      console.log("login success!");
      return { ...state, loggedIn: true, loggedInUser: payload };
    case LOGIN_FAILURE:
      console.log("login failure...");
      return { loggedIn: false };
    default:
      return state;
  }
}

export default loginStatusReducer;
