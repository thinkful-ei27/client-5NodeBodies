import {
  CREATE_ADVENTURE_REQUEST,
  CREATE_ADVENTURE_SUCCESS,
  CREATE_ADVENTURE_ERROR,
  GET_ALL_ADVENTURES_ERROR,
  GET_ALL_ADVENTURES_REQUEST,
  GET_ALL_ADVENTURES_SUCCESS,
  GET_ADVENTURE_SUCCESS,

} from '../actions/createAdventure'

const initialState = {
  loading: false,
  error: null,
  adventureId: null,
  adventures: [],
  currentAdventure: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ADVENTURE_REQUEST: {
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    }
    case CREATE_ADVENTURE_SUCCESS: {

      return Object.assign({}, state, {
        loading: false,
        currentAdventure: action.currentAdventure
      });
    }
    case CREATE_ADVENTURE_ERROR: {
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });
    }
    case GET_ADVENTURE_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        adventure: action.currentAdventure
      })
    }
    case GET_ALL_ADVENTURES_REQUEST: {
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    }
    case GET_ALL_ADVENTURES_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        adventures: action.adventures
      });
    }
    case GET_ALL_ADVENTURES_ERROR: {
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });
    }
    default:
      return state
  }
}