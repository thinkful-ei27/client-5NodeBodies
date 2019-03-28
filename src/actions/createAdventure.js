
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

export const GET_ADVENTURE_SUCCESS = 'GET_ADVENTURE_SUCCESS';
export const getAdventureSuccess = (adventure) => ({
    type: GET_ADVENTURE_SUCCESS,
    adventure
});

export const CREATE_ADVENTURE_ERROR = 'CREATE_ADVENTURE_ERROR';
export const createAdventureError = error => ({
  type: CREATE_ADVENTURE_ERROR,
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
        .then(res => dispatch(getAdventureSuccess(res)))
        .catch(error => {
          dispatch(createAdventureError(error))

        });
}

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
        .then(res => {
            dispatch(createAdventureSuccess(res))
            dispatch(getAdventureById(res)) //maybe later, update to put this into a single enpoint?
        })
        .catch(error => {
          dispatch(createAdventureError(error))

        });
};
