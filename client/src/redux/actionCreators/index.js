import { 
    UPDATE_LOGIN_USERNAME,
    UPDATE_LOGIN_PASSWORD,
    UPDATE_SIGNUP_USERNAME,
    UPDATE_SIGNUP_PASSWORD,
    UPDATE_SIGNUP_CONFIRM_PASSWORD
} from "../actionTypes";

export const updateLoginUsername = username => (
    {
        type: UPDATE_LOGIN_USERNAME,
        payload: username
    }
); 
export const updateLoginPassword = password => (
    {
        type: UPDATE_LOGIN_PASSWORD, 
        payload: password 
    }
); 

export const updateSignupUsername = username => (
    {
        type: UPDATE_SIGNUP_USERNAME,
        payload: username 
    }
);

export const updateSignupPassword = password => (
    {
        type: UPDATE_SIGNUP_PASSWORD,
        payload: password
    }
);

export const updateSignupConfirmPassword = password => (
    {
        type: UPDATE_SIGNUP_CONFIRM_PASSWORD,
        payload: password
    }
);