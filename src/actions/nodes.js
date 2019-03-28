
import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from '../utils';

export const NODE_FORM_WITH_POINTER = 'NODE_FORM_WITH_POINTER';
export const NodeFormWithPointer = (parentNode) => ({
  type: NODE_FORM_WITH_POINTER,
  parentNode,
});

export const CREATE_NODE_REQUEST = 'CREATE_NODE_REQUEST';
export const createNodeRequest = () => ({
  type: CREATE_NODE_REQUEST,
});

export const CREATE_NODE_SUCCESS = 'CREATE_NODE_SUCCESS';
export const createNodeSuccess = (nodeId) => ({
  type: CREATE_NODE_SUCCESS,
  nodeId
});

export const CREATE_NODE_ERROR = 'CREATE_NODE_ERROR';
export const createNodeError = error => ({
  type: CREATE_NODE_ERROR,
  error
});

export const createNode = node => (dispatch) => {
  dispatch(createNodeRequest())
  return fetch(`${API_BASE_URL}/node`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(node)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => dispatch(createNodeSuccess(res)))
    .catch(err => {
      dispatch(createNodeError(err))

    });
};