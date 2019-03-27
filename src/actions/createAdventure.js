
import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from '../utils';


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

export const createAdventure = adventure => (dispatch) => {
    dispatch(createAdventureRequest())
    return fetch(`${API_BASE_URL}/adventure/newAdventure`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(adventure)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(res => dispatch(createAdventureSuccess(res)))
        .catch(err => {
          dispatch(createAdventureError(err))

        });
};