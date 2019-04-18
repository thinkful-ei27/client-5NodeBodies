import {
  GET_STUDENT_ADVENTURE_ERROR,
  GET_STUDENT_ADVENTURE_REQUEST,
  GET_STUDENT_ADVENTURE_SUCCESS,
  GET_STUDENT_CURRENTNODE_ERROR,
  GET_STUDENT_CURRENTNODE_REQUEST,
  GET_STUDENT_CURRENTNODE_SUCCESS,
  RESTART_STUDENT_ADVENTURE,
  GET_STUDENT_SEARCH_ERROR,
  GET_STUDENT_SEARCH_REQUEST,
  GET_STUDENT_SEARCH_SUCCESS,
  STUDENT_END_TUTORIAL,
  STUDENT_NEXT_TUTORIAL,
  STUDENT_PREVIOUS_TUTORIAL,
  STUDENT_START_TUTORIAL,
  END_STUDENT_ADVENTURE
} from '../actions/student'

const initialState = {
  loading: false,
  error: null,
  adventure: null, 
  currentNode: null,
  searchResults: null,
  tutorial: false,
  tutorialPage: 0
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
        currentNode: action.node,
        error: null
      });
    }
    case GET_STUDENT_CURRENTNODE_ERROR: {
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });
    }
    case RESTART_STUDENT_ADVENTURE: {
      return Object.assign({}, state, {
        currentNode: null,
        error: null
      });
    }
    case END_STUDENT_ADVENTURE: {
      return Object.assign({}, state, {
        adventure: null,
        currentNode: null,
        searchResults: null,
        tutorial: null,
        error: null
      });
    }
    case GET_STUDENT_SEARCH_REQUEST: {
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    }
    case GET_STUDENT_SEARCH_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        searchResults: action.results,
        error: null
      });
    }
    case GET_STUDENT_SEARCH_ERROR: {
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });
    }
    case STUDENT_START_TUTORIAL: {
      return Object.assign({}, state, {
        tutorial: true
      });
    }
    case STUDENT_END_TUTORIAL: {
      return Object.assign({}, state, {
        tutorial: false,
        tutorialPage: 0
      });
    }
    case STUDENT_NEXT_TUTORIAL: {
      return Object.assign({}, state, {
        tutorialPage: action.tutorialPageNumber + 1
      });
    }
    case STUDENT_PREVIOUS_TUTORIAL: {
      return Object.assign({}, state, {
        tutorialPage: action.tutorialPageNumber - 1
      });
    }
    default:
      return state
  }
}