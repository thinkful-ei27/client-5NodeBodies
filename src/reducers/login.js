import {
    LOGIN_ERROR,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
} from '../actions/login';

const initialState = {
   authToken: null,
   currentUser: null,
   loading: false,
   loggedIn: false,
   error: null
};

export default function loginRegReducer(state=initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST: {
            return Object.assign({}, state, {
                loading: true,
                error: null
            });
        }
        case LOGIN_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                loggedIn: true
            })
        }
        case LOGIN_ERROR: {
            return Object.assign({}, state, {
                loading: false,
                error: action.error
            })
        }
        default:
            return state
    }
}
