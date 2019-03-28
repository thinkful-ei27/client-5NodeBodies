import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from '../utils';

export const GET_STUDENT_ADVENTURE_REQUEST = 'GET_STUDENT_ADVENTURE_REQUEST';
export const getStudentAdventureRequest = () => ({
  type: GET_STUDENT_ADVENTURE_REQUEST,
});

export const GET_STUDENT_ADVENTURE_SUCCESS = 'GET_STUDENT_ADVENTURE_SUCCESS';
export const getStudentAdventureSuccess = adventure => ({
  type: GET_STUDENT_ADVENTURE_SUCCESS,
  adventure
});

export const GET_STUDENT_ADVENTURE_ERROR = 'GET_STUDENT_ADVENTURE_ERROR';
export const getStudentAdventureError = error => ({
  type: GET_STUDENT_ADVENTURE_ERROR,
  error
});

export const getStudentAdventure = (id) => (dispatch) => {
  console.log('getStudentAdventure Ran')
  dispatch(getStudentAdventureRequest());
  return fetch(`${API_BASE_URL}/student/adventure/${id}`, {
    method: 'GET'
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => dispatch(getStudentAdventureSuccess(res)))
    .catch(error => {
      dispatch(getStudentAdventureError(error))
    });
};
