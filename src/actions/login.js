import { SubmissionError } from 'redux-form';
import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from '../utils';


export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const loginRequest = () => ({
    type: LOGIN_REQUEST,
});

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = currentUser => ({
    type: LOGIN_SUCCESS,
    currentUser
});

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const loginError = error => ({
    type: LOGIN_ERROR,
    error
});

export const loginUser = (username, password) => dispatch => {
    return fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(username, password)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .catch(err => {
            const { reason, message, location } = err;
            if (reason === 'ValidationError') {
                //Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
        });
};