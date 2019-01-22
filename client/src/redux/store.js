import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import loginPageReducer from './reducers/loginPageReducer';
import signupPageReducer from './reducers/signupPageReducer';
import loginStatusReducer from './reducers/loginStatusReducer';

const rootReducer = combineReducers({
    login: loginPageReducer,
    signup: signupPageReducer,
    loginStatus: loginStatusReducer
});

export default createStore(
    rootReducer,
    applyMiddleware(thunk)
);