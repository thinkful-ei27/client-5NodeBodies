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

export const GET_STUDENT_SEARCH_REQUEST = 'GET_STUDENT_SEARCH_REQUEST';
export const getStudentSearchRequest = () => ({
  type: GET_STUDENT_SEARCH_REQUEST,
});

export const GET_STUDENT_SEARCH_SUCCESS = 'GET_STUDENT_SEARCH_SUCCESS';
export const getStudentSearchSuccess = results => ({
  type: GET_STUDENT_SEARCH_SUCCESS,
  results
});

export const GET_STUDENT_SEARCH_ERROR = 'GET_STUDENT_SEARCH_ERROR';
export const getStudentSearchError = error => ({
  type: GET_STUDENT_SEARCH_ERROR,
  error
});

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
    .then(([res]) => {
      dispatch(getStudentCurrentNodeSuccess(res))
    })
    .catch(error => {
      dispatch(getStudentCurrentNodeError(error))
    });
};

export const getStudentAll = () => (dispatch) => {
  dispatch(getStudentSearchRequest());
  return fetch(`${API_BASE_URL}/student/search`, {
    method: 'GET'
  })
    .then(res => {
      return normalizeResponseErrors(res)
    })
    .then(res => {
      return res.json()
    })
    .then(res => {
      console.log(res);
      return dispatch(getStudentSearchSuccess(res))
    })
    .catch(error => {
      return dispatch(getStudentSearchError(error));
    })
}

export const getStudentSearch = (searchTerm) => (dispatch) => {
  dispatch(getStudentSearchRequest());
  return fetch(`${API_BASE_URL}/student/search/${searchTerm}`, {
    method: 'GET'
  })
    .then(res => {
      return normalizeResponseErrors(res)
    })
    .then(res => {
      return res.json()
    })
    .then(res => {
      console.log(res);
      return dispatch(getStudentSearchSuccess(res))
    })
    .catch(error => {
      return dispatch(getStudentSearchError(error));
    })
}