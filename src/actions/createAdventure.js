
import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from '../utils';
import { setCurrentNode } from './nodes.js'

export const TOGGLE_ADVENTURE_DELETING = 'TOGGLE_ADVENTURE_DELETING';
export const toggleAdventureDeleting = () => ({
  type: TOGGLE_ADVENTURE_DELETING
});

export const TOGGLE_ADVENTURE_EDITING = 'TOGGLE_ADVENTURE_EDITING';
export const toggleAdventureEditing = () => ({
  type: TOGGLE_ADVENTURE_EDITING
});

export const TOGGLE_ANALYTICS_DISPLAY = 'TOGGLE_ANALYTICS_DISPLAY';
export const toggleAnalyticsDisplay = () => ({
  type: TOGGLE_ANALYTICS_DISPLAY
})

export const CREATE_ADVENTURE_REQUEST = 'CREATE_ADVENTURE_REQUEST';
export const createAdventureRequest = () => ({
  type: CREATE_ADVENTURE_REQUEST,
});

export const CREATE_ADVENTURE_SUCCESS = 'CREATE_ADVENTURE_SUCCESS';
export const createAdventureSuccess = (currentAdventure) => ({
  type: CREATE_ADVENTURE_SUCCESS,
  currentAdventure
});

export const GET_ADVENTURE_SUCCESS = 'GET_ADVENTURE_SUCCESS';
export const getAdventureSuccess = (currentAdventure) => {

  return ({
    type: GET_ADVENTURE_SUCCESS,
    currentAdventure
  })
};

export const CREATE_ADVENTURE_ERROR = 'CREATE_ADVENTURE_ERROR';
export const createAdventureError = error => ({
  type: CREATE_ADVENTURE_ERROR,
  error
});

export const DELETE_ADVENTURE_REQUEST = 'DELETE_ADVENTURE_REQUEST';
export const deleteAdventureRequest = () => ({
  type: DELETE_ADVENTURE_REQUEST,
});

export const DELETE_ADVENTURE_SUCCESS = 'DELETE_ADVENTURE_SUCCESS';
export const deleteAdventureSuccess = (adventureId) => ({
  type: DELETE_ADVENTURE_SUCCESS,
  adventureId
});

export const DELETE_ADVENTURE_ERROR = 'DELETE_ADVENTURE_ERROR';
export const deleteAdventureError = error => ({
  type: DELETE_ADVENTURE_ERROR,
  error
});

export const GET_ADVENTURE_BY_ID = 'GET_ADVENTURE_BY_ID';
export const getAdventureById = adventureId => (dispatch, getState) => {
  dispatch(createAdventureRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/adventure/${adventureId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    },
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => {
      const headNode = getHeadNodefromAdventure(res);
      dispatch(setCurrentNode(headNode))
      dispatch(getAdventureSuccess(res))
    })
    .catch(error => {
      return dispatch(createAdventureError(error))
    });
}

export const UPDATE_ADVENTURE_BY_ID = 'UPDATE_ADVENTURE_BY_ID';
export const updateAdventureById = adventureId => (dispatch, getState) => {
  dispatch(createAdventureRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/adventure/${adventureId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    },
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(adventure => {
      dispatch(getAdventureSuccess(adventure))
      return adventure;
    })
    .catch(error => {
      return dispatch(createAdventureError(error))
    });
}

// helper function that gets the head node from newadventure object
function getHeadNodefromAdventure(adventure) {
  const headNode = adventure.head;
  return headNode
}

export const createAdventure = adventure => (dispatch, getState) => {
  dispatch(createAdventureRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/adventure/newAdventure`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(adventure)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => {
      // let headNode = getHeadNodefromAdventure(res)
      // dispatch(setCurrentNode(headNode))
      return dispatch(createAdventureSuccess(res))
    })
    .catch(error => {
      return dispatch(createAdventureError(error))
    });
};

export const GET_ALL_ADVENTURES_REQUEST = 'GET_ALL_ADVENTURES_REQUEST';
export const getAllAdventuresRequest = () => ({
  type: GET_ALL_ADVENTURES_REQUEST,
});

export const GET_ALL_ADVENTURES_SUCCESS = 'GET_ALL_ADVENTURES_SUCCESS';
export const getAllAdventuresSuccess = adventures => ({
  type: GET_ALL_ADVENTURES_SUCCESS,
  adventures
});

export const GET_ALL_ADVENTURES_ERROR = 'GET_ALL_ADVENTURES_ERROR';
export const getAllAdventuresError = error => ({
  type: GET_ALL_ADVENTURES_ERROR,
  error
});

export const RERENDER_GRAPH = 'RERENDER_GRAPH ';
export const reRenderGraph = () => ({
  type: RERENDER_GRAPH,
});
export const getAllAdventures = () => (dispatch, getState) => {
  dispatch(createAdventureRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/adventure`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => dispatch(getAllAdventuresSuccess(res)))
    .catch(error => {
      dispatch(getAllAdventuresError(error))
    });
};

export const deleteAdventure = adventureId => (dispatch, getState) => {
  dispatch(deleteAdventureRequest())
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/adventure/${adventureId}/`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'content-type': 'application/json'
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => {
      dispatch(deleteAdventureSuccess())
    })
    .catch(err => {
      dispatch(deleteAdventureError(err))
    });
};

export const EDIT_ADVENTURE_REQUEST = 'EDIT_ADVENTURE_REQUEST';
export const editAdventureRequest = () => ({
  type: EDIT_ADVENTURE_REQUEST,
});

export const EDIT_ADVENTURE_SUCCESS = 'EDIT_ADVENTURE_SUCCESS';
export const editAdventureSuccess = (currentAdventure) => ({
  type: EDIT_ADVENTURE_SUCCESS,
  currentAdventure
});

export const EDIT_ADVENTURE_ERROR = 'EDIT_ADVENTURE_ERROR';
export const editAdventureError = error => ({
  type: EDIT_ADVENTURE_ERROR,
  error
});

export const editAdventure = adventure => (dispatch, getState) => {
  dispatch(editAdventureRequest());
  let id = getState().adventure.currentAdventure.id;
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/adventure/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(adventure)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => {
      const headNode = getHeadNodefromAdventure(res);
      dispatch(setCurrentNode(headNode))
      return dispatch(editAdventureSuccess(res))
    })
    .catch(error => {
      return dispatch(editAdventureError(error))
    });
};

