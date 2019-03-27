import {
    SET_AUTH_TOKEN,
    CLEAR_AUTH,
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_ERROR
} from '../actions/auth'

const initialState = {
    authToken: null,
    currentUser: null,
    loading: false,
    login: false,
    error: null
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_AUTH_TOKEN: {
            console.log('set auth token ran');
            return Object.assign({}, state, {
                authToken: action.authToken
            });
        }
        case CLEAR_AUTH: {
            return Object.assign({}, state, {
                authToken: null,
                currentUser: null
            });
        }
        case AUTH_REQUEST: {
            console.log('auth request ran');
            return Object.assign({}, state, {
                loading: true,
                error: null
            });
        }
        case AUTH_SUCCESS: {
            console.log('auth success ran');
            return Object.assign({}, state, {
                loading: false,
                authToken: action.authToken
            });
        }
        case AUTH_ERROR: {
            return Object.assign({}, state, {
                loading: false,
                error: action.err
            });
        }
        default:
            return state
    }
}