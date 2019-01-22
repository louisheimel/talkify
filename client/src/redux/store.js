import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import loginPageReducer from './reducers/loginPageReducer';
import signupPageReducer from './reducers/signupPageReducer';

const rootReducer = combineReducers({
    login: loginPageReducer,
    signup: signupPageReducer
});

export default createStore(
    rootReducer,
    applyMiddleware(thunk)
);