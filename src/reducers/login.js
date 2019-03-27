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
            console.log('login request ran');
            return Object.assign({}, state, {
                loading: true,
                error: null
            });
        }
        case LOGIN_SUCCESS: {
            console.log('login success ran');
            return Object.assign({}, state, {
                loading: false,
                loggedIn: true,
                currentUser: action.currentUser
            })
        }
        case LOGIN_ERROR: {
            console.log('login error ran');
            return Object.assign({}, state, {
                loading: false,
                error: action.error
            })
        }
        default:
            return state
    }
}
