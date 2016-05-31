import { fromJS } from 'immutable';
import StoreFactory from './store-factory';

const ENTITY_URL = 'settings';

// Fetch
const START_FETCH = `${ENTITY_URL}/START_FETCH`;
const FETCH_SUCCESS = `${ENTITY_URL}/FETCH_SUCCESS`;
const FETCH_FAILURE = `${ENTITY_URL}/FETCH_FAILURE`;

// Update
const START_UPDATE = `${ENTITY_URL}/START_UPDATE`;
const UPDATE_SUCCESS = `${ENTITY_URL}/UPDATE_SUCCESS`;
const UPDATE_FAILURE = `${ENTITY_URL}/UPDATE_FAILURE`;

const INITIAL_STATE = fromJS({
  entityConfig: {
    apiUrl: 'master--settings'
  },
  ui: {
    loading: false,
    error: false,
  },
  data: {
    exchangeRate: 0.84
  }
});

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case START_FETCH:
      // set loading
      return state.setIn(['ui', 'error'], null)
        .setIn(['ui', 'loading'], true);
    case FETCH_SUCCESS:
      // set responded data and cancel loading
      return state.set('data', fromJS(action.payload))
        .setIn(['ui', 'error'], null)
        .setIn(['ui', 'loading'], false);
    case FETCH_FAILURE:
      // set error and cancel loading
      return state.setIn(['ui', 'error'], action.payload)
        .setIn(['ui', 'loading'], false);
    case START_UPDATE:
      // set loading
      return state.setIn(['ui', 'error'], null)
        .setIn(['ui', 'loading'], true);
    case UPDATE_SUCCESS:
      // cancel loading
      return state.setIn(['ui', 'error'], null)
        .setIn(['ui', 'loading'], false);
    case UPDATE_FAILURE:
      // set error and cancel loading
      return state.setIn(['ui', 'error'], action.payload)
        .setIn(['ui', 'loading'], false);
    default:
      return state;
  }
}

/** Make the server request, using redux-thunk */
export function fetch() {
  return (dispatch, getState) => {
    dispatch(startFetch());

    const apiUrl = getState()[ENTITY_URL].getIn(['entityConfig', 'apiUrl']);

    StoreFactory.getInstance().retrieveOnce(apiUrl, entity => {
      dispatch(fetchSuccess(entity));

      if (!entity) {
        dispatch(fetchFailure('entity not found'));
      }
    });
  };
}

/** Make the server request, using redux-thunk */
export function update(fields) {
  return (dispatch, getState) => {
    dispatch(startUpdate(fields));

    const apiUrl = getState()[ENTITY_URL].getIn(['entityConfig', 'apiUrl']);

    StoreFactory.getInstance().updateAll(apiUrl, fields, error => {
      if (error) {
        dispatch(updateFailure(error));
      } else {
        dispatch(updateSuccess(fields));
        dispatch(fetch());
      }
    });
  };
}

/**
 * Dispatch this when start a fetch process
 */
function startFetch() {
  return {
    type: START_FETCH
  };
}

/**
 * Dispatch this when get a successful response
 */
function fetchSuccess(entity) {
  return {
    type: FETCH_SUCCESS,
    payload: entity
  };
}

/**
 * Dispatch this when get a failed response
 */
function fetchFailure(error) {
  return {
    type: FETCH_FAILURE,
    payload: error
  };
}

/**
 * Dispatch this when start a create process
 */
function startUpdate(fields) {
  return {
    type: START_UPDATE,
    payload: { fields }
  };
}

/**
 * Dispatch this when get a successful response
 */
function updateSuccess(fields) {
  return {
    type: UPDATE_SUCCESS,
    payload: fields
  };
}

/**
 * Dispatch this when get a failed response
 */
function updateFailure(error) {
  return {
    type: UPDATE_FAILURE,
    payload: error
  };
}
