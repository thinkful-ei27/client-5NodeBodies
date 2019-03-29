
import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from '../utils';
import { getAdventureById } from './createAdventure';

export const NODE_FORM_WITH_POINTER = 'NODE_FORM_WITH_POINTER';
export const nodeFormWithPointer = (nodeIdAndPointer) => {
  return ({
    type: NODE_FORM_WITH_POINTER,
    nodeIdAndPointer, //parent ref object
  })
};

export const SET_CURRENT_NODE = 'SET_CURRENT_NODE';
export const setCurrentNode = (node) => ({
  type: SET_CURRENT_NODE,
  node,
})

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

export const createNode = node => (dispatch, getState) => {
  dispatch(createNodeRequest())
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/adventure/newNode`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(node)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => {
      dispatch(getAdventureById(res.adventureId));
      dispatch(createNodeSuccess(res))
    })
    .catch(err => {
      dispatch(createNodeError(err))

    });
};