import {SubmissionError} from 'redux-form';
import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from '../utils';


export const REG_REQUEST = 'REG_REQUEST';
export const regRequest = () => ({
    type: REG_REQUEST,
});

export const REG_SUCCESS = 'REG_SUCCESS';
export const regSuccess = currentUser => ({
    type: REG_SUCCESS,
    currentUser
});

export const REG_ERROR = 'REG_ERROR';
export const regError = error => ({
    type: REG_ERROR,
    error
});

export const registerUser = user => {
    return fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .catch(err => {
            const {reason, message, location} = err;
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