
import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from '../utils';
import { getAdventureById } from './createAdventure';

export const NODE_FORM_WITH_POINTER = 'NODE_FORM_WITH_POINTER';
export const nodeFormWithPointer = (parentInt) => {
  return ({
    type: NODE_FORM_WITH_POINTER,
    parentInt,
  })
};

export const STAGE_CHILD_NODE = 'STAGE_CHILD_NODE';
export const stageChildNode = (node) => ({
  type: STAGE_CHILD_NODE,
  node,
})

export const TOGGLE_CHILD_TYPE = 'TOGGLE_CHILD_TYPE';
export const toggleChildType = () => ({
  type: TOGGLE_CHILD_TYPE
})

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

export const UPDATE_NODE_CLICKED = 'UPDATE_NODE_CLICKED';
export const updateNodeClicked = (nodeId) => ({
  type: UPDATE_NODE_CLICKED,
  nodeId
});

export const UPDATE_NODE_REQUEST = 'UPDATE_NODE_REQUEST';
export const updateNodeRequest = () => ({
  type: UPDATE_NODE_REQUEST,
});

export const UPDATE_NODE_SUCCESS = 'UPDATE_NODE_SUCCESS';
export const updateNodeSuccess = (nodeId) => ({
  type: UPDATE_NODE_SUCCESS,
  nodeId
});

export const UPDATE_NODE_ERROR = 'UPDATE_NODE_ERROR';
export const updateNodeError = error => ({
  type: UPDATE_NODE_ERROR,
  error
});

export const DELETE_NODE_REQUEST = 'DELETE_NODE_REQUEST';
export const deleteNodeRequest = () => ({
  type: DELETE_NODE_REQUEST,
});

export const DELETE_NODE_SUCCESS = 'DELETE_NODE_SUCCESS';
export const deleteNodeSuccess = (nodeId) => ({
  type: DELETE_NODE_SUCCESS,
  nodeId
});

export const DELETE_NODE_ERROR = 'DELETE_NODE_ERROR';
export const deleteNodeError = error => ({
  type: DELETE_NODE_ERROR,
  error
});

export const TOGGLE_NODE_DELETING = 'TOGGLE_NODE_DELETING';
export const toggleNodeDeleting = () => ({
  type: TOGGLE_NODE_DELETING
});

export const createNode = node => (dispatch, getState) => {
  let nodeId;
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
      nodeId = res.createdNode.id
      return dispatch(getAdventureById(res.adventureId));
    })
    .then(() => {
      dispatch(createNodeSuccess(nodeId))
    })
    .catch(err => {
      dispatch(createNodeError(err))

    });
};

export const deleteNode = (adventureId, nodeId) => (dispatch, getState) => {
  dispatch(deleteNodeRequest())
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/adventure/${adventureId}/${nodeId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'content-type': 'application/json'
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => {
      dispatch(deleteNodeSuccess())
    })
    .catch(err => {
      dispatch(deleteNodeError(err))
    });
};
export const linkNodesById = idObjectWithParentInt => (dispatch, getState) => {
  dispatch(updateNodeRequest())
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/adventure/linkNodes`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(idObjectWithParentInt)
  })
    .then(() => {
      dispatch(getAdventureById(idObjectWithParentInt.adventureId));
    })
    .then(() => {
      // dispatch(updateNodeSuccess())
    })
    .catch(err => {
      dispatch(createNodeError(err))
    });
}


export const updateNode = node => (dispatch, getState) => {
  dispatch(updateNodeRequest())
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/adventure/${node.adventureId}/${node.nodeId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(node)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => {
      console.log("New Node From Backend is: ", res)
      dispatch(getAdventureById(node.adventureId));
    })
    .then(() => {
      // dispatch(updateNodeSuccess())
    })
    .catch(err => {
      dispatch(createNodeError(err))
    });
};

export const TOGGLE_ENDING = 'TOGGLE_ENDING';
export const toggleEnding = () => ({
  type: TOGGLE_ENDING
});
