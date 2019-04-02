import {
  CREATE_NODE_REQUEST,
  CREATE_NODE_SUCCESS,
  CREATE_NODE_ERROR,
  NODE_FORM_WITH_POINTER,
  SET_CURRENT_NODE,
  TOGGLE_ENDING
} from '../actions/nodes'

const initialState = {
  loading: false,
  error: null,
  nodeId: null,
  parentInt: null,
  currentNode: null,
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
    default:
      return state
  }
}