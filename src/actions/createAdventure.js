
import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from '../utils';

export const CREATE_ADVENTURE_REQUEST = 'CREATE_ADVENTURE_REQUEST';
export const createAdventureRequest = () => ({
  type: CREATE_ADVENTURE_REQUEST,
});

export const CREATE_ADVENTURE_SUCCESS = 'CREATE_ADVENTURE_SUCCESS';
export const createAdventureSuccess = (adventureId) => ({
  type: CREATE_ADVENTURE_SUCCESS,
  adventureId
});

export const CREATE_ADVENTURE_ERROR = 'CREATE_ADVENTURE_ERROR';
export const createAdventureError = error => ({
  type: CREATE_ADVENTURE_ERROR,
  error
});

export const createAdventure = adventure => (dispatch, getState) => {
  dispatch(createAdventureRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/adventure/newAdventure`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(adventure)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => dispatch(createAdventureSuccess(res)))
    .catch(error => {
      dispatch(createAdventureError(error))

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

export const getAllAdventures = () => (dispatch, getState) => {
  console.log('getAllAdventures Ran')
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
    .then(res => dispatch(createAdventureSuccess(res)))
    .catch(error => {
      dispatch(createAdventureError(error))
    });
};
