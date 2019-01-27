import { combineReducers, createStore, applyMiddleware, compose } from "redux";

import thunk from "redux-thunk";

import loginPageReducer from "./reducers/loginPageReducer";
import signupPageReducer from "./reducers/signupPageReducer";
import loginStatusReducer from "./reducers/loginStatusReducer";

import { loadState } from "./localStorage";

// state can be saved with saveState method from local storage module

const persistedState = loadState();

const rootReducer = combineReducers({
  login: loginPageReducer,
  signup: signupPageReducer,
  loginStatus: loginStatusReducer
});
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
  // other store enhancers if any
);
export default createStore(rootReducer, persistedState, enhancer);
