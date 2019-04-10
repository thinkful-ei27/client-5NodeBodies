import reducer from '../reducers/nodes';
import {
  CREATE_NODE_REQUEST,
  CREATE_NODE_SUCCESS,
  CREATE_NODE_ERROR,
  NODE_FORM_WITH_POINTER,
  SET_CURRENT_NODE,
  UPDATE_NODE_REQUEST,
  UPDATE_NODE_SUCCESS,
  UPDATE_NODE_ERROR,
  TOGGLE_UPDATE_FORM,

  TOGGLE_NODE_DELETING,
  DELETE_NODE_ERROR,
  DELETE_NODE_REQUEST,
  DELETE_NODE_SUCCESS,


  TOGGLE_ENDING,
  TOGGLE_CHILD_TYPE,
  STAGE_CHILD_NODE
} from '../actions/nodes'

describe('INITIAL STATE', () => {
  test('is correct', () => {
    const action = { type: 'dummy_action' };
    const initialState = {
      loading: false,
      error: null,
      nodeId: null,
      parentInt: null,
      currentNode: null,
      showUpdate: false,
      isDeleting: false,
      isEnding: false,
      useExistingNode: false,
      stagedChildNode: null
    }

    expect(reducer(undefined, action)).toEqual(initialState)
  })
})

describe('Request Reducers', () => {
  test('State with loading: true ', () => {
    const requestActions = [
      { type: CREATE_NODE_REQUEST },
      { type: UPDATE_NODE_REQUEST },
      { type: DELETE_NODE_REQUEST },
    ];
    const expectedState = {
      loading: true,
      error: null,
      nodeId: null,
      parentInt: null,
      currentNode: null,
      showUpdate: false,
      isDeleting: false,
      isEnding: false,
      useExistingNode: false,
      stagedChildNode: null
    }

    requestActions.forEach(action => expect(reducer(undefined, action)).toEqual(expectedState))

  })
})