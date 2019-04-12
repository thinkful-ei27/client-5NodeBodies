
import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from '../utils';
import { updateAdventureById } from './createAdventure';

export const NODE_FORM_WITH_POINTER = 'NODE_FORM_WITH_POINTER';
export const nodeFormWithPointer = (parentInt) => {
  return ({
    type: NODE_FORM_WITH_POINTER,
    parentInt,
  })
};

export const CLEAR_CURRENT_NODE = 'CLEAR_CURRENT_NODE';
export const clearCurrentNode = () => ({
  type: CLEAR_CURRENT_NODE
})


export const STAGE_CHILD_NODE = 'STAGE_CHILD_NODE';
export const stageChildNode = (node) => ({
  type: STAGE_CHILD_NODE,
  node,
})

export const TOGGLE_CHILD_TYPE = 'TOGGLE_CHILD_TYPE';
export const toggleChildType = () => ({
  type: TOGGLE_CHILD_TYPE
})

// set current node will now also normalize isEnding in state to it so they are in  sync
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

export const TOGGLE_UPDATE_FORM = 'TOGGLE_UPDATE_FORM';
export const toggleUpdateForm = (nodeId) => ({
  type: TOGGLE_UPDATE_FORM,
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

export const TOGGLE_ENDING = 'TOGGLE_ENDING';
export const toggleEnding = () => ({
  type: TOGGLE_ENDING
});

export const createNode = nodeData => (dispatch, getState) => {
  let nodeId;
  dispatch(createNodeRequest())
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/adventure/newNode`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(nodeData)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => {
      if (nodeData.parentId) {
        nodeId = nodeData.parentId;
      }
      else nodeId = res.createdNode.id;
      return dispatch(updateAdventureById(res.adventureId));
    })
    .then((adventure) => {
      const updatedNode = getNodeFromCurrentAdventure(nodeId, adventure);
      dispatch(setCurrentNode(updatedNode))
      return dispatch(createNodeSuccess(nodeId));
    })
    .catch(err => {
      dispatch(createNodeError(err));

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
    .then(() => {
      return dispatch(updateAdventureById(adventureId))
    })
    .then((adventure) => {
      dispatch(toggleNodeDeleting())
      dispatch(setCurrentNode(adventure.head))
      return dispatch(deleteNodeSuccess())
      // sets showUpdate to false in reducer
    })
    .catch(err => {
      dispatch(deleteNodeError(err))
    });
};


export const linkNodesById = idObjectWithParentInt => (dispatch, getState) => {
  let adventureId = idObjectWithParentInt.adventureId
  let nodeId = idObjectWithParentInt.parentId
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
      return dispatch(updateAdventureById(adventureId));
    })
    .then((adventure) => {
      const updatedNode = getNodeFromCurrentAdventure(nodeId, adventure);
      dispatch(setCurrentNode(updatedNode))
      return dispatch(updateNodeSuccess())
    })
    .catch(err => {
      dispatch(updateNodeError(err))
    });
}


export const updateNode = nodeData => (dispatch, getState) => {
  debugger;
  let nodeId = nodeData.nodeId
  dispatch(updateNodeRequest())
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/adventure/${nodeData.adventureId}/${nodeData.nodeId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(nodeData)
  })
    .then(res => normalizeResponseErrors(res))
    .then(() => {
      // console.log("New Node From Backend is: ", res)
      // return dispatch(getAdventureById(node.adventureId));
      dispatch(toggleUpdateForm())
      return dispatch(updateAdventureById(nodeData.adventureId));
    })
    .then((adventure) => {
      const updatedNode = getNodeFromCurrentAdventure(nodeId, adventure);
      dispatch(setCurrentNode(updatedNode))
      return dispatch(updateNodeSuccess())
    })
    .catch(err => {
      dispatch(updateNodeError(err))
    });
};

// helper fn to find node in adventure
function getNodeFromCurrentAdventure(nodeId, adventure) {
  let nodeToReturn = adventure.nodes.find(node => node.id === nodeId);
  return nodeToReturn

}

