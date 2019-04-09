import {
    SET_AUTH_TOKEN,
    CLEAR_AUTH,
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_ERROR,
    TOGGLE_ONBOARDING
} from '../actions/auth'

const initialState = {
    authToken: null,
    currentUser: null,
    loading: false,
    error: null,
    onboarding: false,
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_ONBOARDING: {
            return Object.assign({}, state, {
                onboarding: !state.onboarding
            });
        }
        case SET_AUTH_TOKEN: {
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
            return Object.assign({}, state, {
                loading: true,
                error: null
            });
        }
        case AUTH_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                currentUser: action.currentUser
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