import {
  CREATE_NODE_REQUEST,
  CREATE_NODE_SUCCESS,
  CREATE_NODE_ERROR,
  NODE_FORM_WITH_POINTER,
  SET_CURRENT_NODE,
  UPDATE_NODE_REQUEST,
  UPDATE_NODE_SUCCESS,
  UPDATE_NODE_ERROR,
  UPDATE_NODE_CLICKED,
  // UPDATE_CURRENT_NODE,
  TOGGLE_ENDING,
  TOGGLE_NODE_DELETING,
  DELETE_NODE_ERROR,
  DELETE_NODE_REQUEST,
  DELETE_NODE_SUCCESS
} from '../actions/nodes'

const initialState = {
  loading: false,
  error: null,
  nodeId: null,
  parentInt: null,
  currentNode: null,
  showUpdate: false,
  isDeleting: false,
  isEnding: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_NODE_REQUEST: {
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    }
    case CREATE_NODE_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        parentInt: null,
        nodeId: action.nodeId
      });
    }
    case CREATE_NODE_ERROR: {
      return Object.assign({}, state, {
        loading: false,
        error: action.err
      });
    }
    case UPDATE_NODE_REQUEST: {
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    }
    case UPDATE_NODE_CLICKED: {
      return Object.assign({}, state, {
        showUpdate: !state.showUpdate,
        nodeId: action.nodeId
      });
    }
    case UPDATE_NODE_SUCCESS: {
      return Object.assign({}, state, {
        showUpdate: false
      });
    }
    case UPDATE_NODE_ERROR: {
      return Object.assign({}, state, {
        loading: false,
        error: action.err
      });
    }
    case NODE_FORM_WITH_POINTER: {
      return Object.assign({}, state, {
        loading: false,
        parentInt: action.parentInt
      });
    }
    case SET_CURRENT_NODE: {
      return Object.assign({}, state, {
        loading: false,
        currentNode: action.node
      })
    }
    case TOGGLE_ENDING: {
      return Object.assign({}, state, {
        isEnding: !state.isEnding
      })
    }
    case TOGGLE_NODE_DELETING: {
      return Object.assign({}, state, {
        isDeleting: !state.isDeleting
      })
    }
    case DELETE_NODE_REQUEST: {
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    }
    case DELETE_NODE_SUCCESS: {
      return Object.assign({}, state, {
        loading: false
      });
    }
    case DELETE_NODE_ERROR: {
      return Object.assign({}, state, {
        loading: false,
        error: action.err
      });
    }
    default:
      return state
  }
}