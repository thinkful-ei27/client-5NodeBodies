import {
  CREATE_ADVENTURE_REQUEST,
  CREATE_ADVENTURE_SUCCESS,
  CREATE_ADVENTURE_ERROR,
  GET_ALL_ADVENTURES_ERROR,
  GET_ALL_ADVENTURES_REQUEST,
  GET_ALL_ADVENTURES_SUCCESS,
  GET_ADVENTURE_SUCCESS,
  // UPDATE_CURRENT_NODE,
  DELETE_ADVENTURE_ERROR,
  DELETE_ADVENTURE_REQUEST,
  DELETE_ADVENTURE_SUCCESS,
  TOGGLE_ADVENTURE_DELETING,
  EDIT_ADVENTURE_ERROR,
  EDIT_ADVENTURE_REQUEST,
  EDIT_ADVENTURE_SUCCESS,
  TOGGLE_ADVENTURE_EDITING,
  TOGGLE_ANALYTICS_DISPLAY,
  RERENDER_GRAPH
} from '../actions/createAdventure'

const initialState = {
  loading: false,
  error: null,
  adventureId: null,
  adventures: [],
  currentAdventure: null,
  currentNode: null,
  isDeleting: false,
  isEditing: true,
  showAnalytics: false,
  reRender: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ADVENTURE_REQUEST: {
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    }
    case EDIT_ADVENTURE_REQUEST: {
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    }
   
    
    case RERENDER_GRAPH: {
      return Object.assign({}, state, {
        reRender: !state.reRender
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
        currentAdventure: action.currentAdventure
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
    case TOGGLE_ADVENTURE_DELETING: {
      return Object.assign({}, state, {
        isDeleting: !state.isDeleting
      })
    }
    case TOGGLE_ADVENTURE_EDITING: {
      return Object.assign({}, state, {
        isEditing: !state.isEditing
      })
    }
    case DELETE_ADVENTURE_REQUEST: {
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    }
    case DELETE_ADVENTURE_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        isDeleting: false
      });
    }
    case DELETE_ADVENTURE_ERROR: {
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });
    }
    case EDIT_ADVENTURE_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        currentAdventure: action.currentAdventure
      });
    }
    case EDIT_ADVENTURE_ERROR: {
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });
    }
    case TOGGLE_ANALYTICS_DISPLAY: {
      return Object.assign({}, state, {
        loading: false,
        showAnalytics: !state.showAnalytics
      })
    }
    default:
      return state
  }
}


// case UPDATE_CURRENT_NODE: {
//   return Object.assign({}, state, {
//     currentNode: state.currentAdventure.nodes.filter(node => node.id === action.nodeId)
//   });
// }