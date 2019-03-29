import {
  GET_STUDENT_ADVENTURE_ERROR,
  GET_STUDENT_ADVENTURE_REQUEST,
  GET_STUDENT_ADVENTURE_SUCCESS
} from '../actions/student'

const initialState = {
  loading: false,
  error: null,
  adventure: null
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_STUDENT_ADVENTURE_REQUEST: {
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    }
    case GET_STUDENT_ADVENTURE_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        adventure: action.adventure,
        error: null
      });
    }
    case GET_STUDENT_ADVENTURE_ERROR: {
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });
    }
    default:
      return state
  }
}