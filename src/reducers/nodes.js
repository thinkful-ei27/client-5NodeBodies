import {
  CREATE_NODE_REQUEST,
  CREATE_NODE_SUCCESS,
  CREATE_NODE_ERROR,
  NODE_FORM_WITH_POINTER,
  SET_CURRENT_NODE,
  UPDATE_NODE_REQUEST,
  UPDATE_NODE_SUCCESS,
  UPDATE_NODE_ERROR,
  TOGGLE_UPDATE_FORM,

  TOGGLE_NODE_DELETING,
  DELETE_NODE_ERROR,
  DELETE_NODE_REQUEST,
  DELETE_NODE_SUCCESS,

  UPDATE_CURRENT_NODE,
  TOGGLE_ENDING,
  TOGGLE_CHILD_TYPE,
  STAGE_CHILD_NODE
} from '../actions/nodes'

const initialState = {
  loading: false,
  error: null,
  nodeId: null,
  parentInt: null,
  currentNode: null,
  showUpdate: false,
  isDeleting: false,
  isEnding: false,
  useExistingNode: false,
  stagedChildNode: null
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
    case TOGGLE_UPDATE_FORM: {
      return Object.assign({}, state, {
        showUpdate: !state.showUpdate,
        nodeId: action.nodeId,
        parentInt: null
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
        useExistingNode: false,
        stagedChildNode: null,
        parentInt: action.parentInt,
      });
    }
    case SET_CURRENT_NODE: {
      // set current node will now also
      //  normalize isEnding in state to it so they are in  sync
      return Object.assign({}, state, {
        loading: false,
        currentNode: action.node,
        parentInt: null,
        isEnding: action.node.ending
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
    case TOGGLE_CHILD_TYPE: {
      return Object.assign({}, state, {
        useExistingNode: !state.useExistingNode,
        // stagedChildNode: null
      })
    }
    case STAGE_CHILD_NODE: {
      return Object.assign({}, state, {
        stagedChildNode: action.node
      })
    }
    default:
      return state
  }
}