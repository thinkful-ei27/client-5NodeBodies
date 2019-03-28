import {
  CREATE_NODE_REQUEST,
  CREATE_NODE_SUCCESS,
  CREATE_NODE_ERROR
} from '../actions/nodes'

const initialState = {
  loading: false,
  error: null,
  nodeId: null
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
        nodeId: action.nodeId
      });
    }
    case CREATE_NODE_ERROR: {
      return Object.assign({}, state, {
        loading: false,
        error: action.err
      });
    }
    default:
      return state
  }
}