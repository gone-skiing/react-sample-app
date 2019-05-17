import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let method = "signupNewUser";
        if (! isSignup) {
            method = "verifyPassword";
        }

        const url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/" + method + "?key=AIzaSyCRgxTWWyPZXmITt4jzSegonK8Et7puyFc";

        axios.post(url, authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response));
            })
            .catch(error => {
                console.log(error);
                dispatch(authFail(error));
            });
    };
};