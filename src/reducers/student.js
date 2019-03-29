import {
  GET_STUDENT_ADVENTURE_ERROR,
  GET_STUDENT_ADVENTURE_REQUEST,
  GET_STUDENT_ADVENTURE_SUCCESS,
  GET_STUDENT_CURRENTNODE_ERROR,
  GET_STUDENT_CURRENTNODE_REQUEST,
  GET_STUDENT_CURRENTNODE_SUCCESS
} from '../actions/student'

const initialState = {
  loading: false,
  error: null,
  adventure: null, 
  currentNode: null
};

export default function reducer(state = initialState, action) {
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
    case GET_STUDENT_CURRENTNODE_REQUEST: {
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    }
    case GET_STUDENT_CURRENTNODE_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        adventure: action.node,
        error: null
      });
    }
    case GET_STUDENT_CURRENTNODE_ERROR: {
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });
    }
    default:
      return state
  }
}