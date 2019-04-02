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

export const GET_STUDENT_CURRENTNODE_REQUEST = 'GET_STUDENT_CURRENTNODE_REQUEST';
export const getStudentCurrentNodeRequest = () => ({
  type: GET_STUDENT_CURRENTNODE_REQUEST,
});

export const GET_STUDENT_CURRENTNODE_SUCCESS = 'GET_STUDENT_CURRENTNODE_SUCCESS';
export const getStudentCurrentNodeSuccess = node => ({
  type: GET_STUDENT_CURRENTNODE_SUCCESS,
  node
});

export const GET_STUDENT_CURRENTNODE_ERROR = 'GET_STUDENT_CURRENTNODE_ERROR';
export const getStudentCurrentNodeError = error => ({
  type: GET_STUDENT_CURRENTNODE_ERROR,
  error
});

export const RESTART_STUDENT_ADVENTURE = 'RESTART_STUDENT_ADVENTURE'
export const restartStudentAdventure = () => ({
  type: RESTART_STUDENT_ADVENTURE
})

export const getStudentAdventure = (id) => (dispatch) => {
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

export const getStudentCurrentNode = (adventureId, nodeId) => (dispatch) => {
  dispatch(getStudentCurrentNodeRequest());
  return fetch(`${API_BASE_URL}/student/${adventureId}/${nodeId}`, {
    method: 'GET'
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => {
      dispatch(getStudentCurrentNodeSuccess(res))
    })
    .catch(error => {
      dispatch(getStudentCurrentNodeError(error))
    });
};
