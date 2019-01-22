import {combineReducers, createStore} from 'redux';

import loginPageReducer from './reducers/loginPageReducer';
import signupPageReducer from './reducers/signupPageReducer';

const rootReducer = combineReducers({
    login: loginPageReducer,
    signup: signupPageReducer
});

export default createStore(rootReducer);