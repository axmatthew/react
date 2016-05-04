/* global moment */
import { push } from 'react-router-redux';
import { fromJS, Map } from 'immutable';
import StoreFactory from '../store/store-factory';

export function getEntityModule(entityUrl, INITIAL_STATE) {
  const SET_PAGE = `${entityUrl}/SET_PAGE`;
  const LIST_SEARCH = `${entityUrl}/LIST_SEARCH`;
  const SET_LIST_FILTER = `${entityUrl}/SET_LIST_FILTER`;

  // Fetch all
  const START_FETCH_ALL = `${entityUrl}/START_FETCH_ALL`;
  const FETCH_ALL_SUCCESS = `${entityUrl}/FETCH_ALL_SUCCESS`;
  const FETCH_ALL_FAILURE = `${entityUrl}/FETCH_ALL_FAILURE`;

  // Fetch by
  const START_FETCH_BY = `${entityUrl}/START_FETCH_BY`;
  const FETCH_BY_SUCCESS = `${entityUrl}/FETCH_BY_SUCCESS`;
  const FETCH_BY_FAILURE = `${entityUrl}/FETCH_BY_FAILURE`;

  // Fetch one
  const START_FETCH = `${entityUrl}/START_FETCH`;
  const FETCH_SUCCESS = `${entityUrl}/FETCH_SUCCESS`;
  const FETCH_FAILURE = `${entityUrl}/FETCH_FAILURE`;

  // Remove all listening callbacks of the store
  const UNLISTEN_ALL = `${entityUrl}/FETCH_FAILURE`;

  // Create
  const START_CREATE = `${entityUrl}/START_CREATE`;
  const CREATE_SUCCESS = `${entityUrl}/CREATE_SUCCESS`;
  const CREATE_FAILURE = `${entityUrl}/CREATE_FAILURE`;

  // Update
  const START_UPDATE = `${entityUrl}/START_UPDATE`;
  const UPDATE_SUCCESS = `${entityUrl}/UPDATE_SUCCESS`;
  const UPDATE_FAILURE = `${entityUrl}/UPDATE_FAILURE`;

  // Delete
  const START_REMOVE = `${entityUrl}/START_REMOVE`;
  const REMOVE_SUCCESS = `${entityUrl}/REMOVE_SUCCESS`;
  const REMOVE_FAILURE = `${entityUrl}/REMOVE_FAILURE`;

  // FIXME: used in Enquiry and PurchaseOrder only
  const TOGGLE_CLOSE_DONE = `${entityUrl}/TOGGLE_CLOSE_DONE`;

  // Context Menu
  const SHOW_CONTEXT_MENU = `${entityUrl}/SHOW_CONTEXT_MENU`;
  const HIDE_CONTEXT_MENU = `${entityUrl}/HIDE_CONTEXT_MENU`;

  return {
    // Used as the reducer/state name
    entityUrl,

    reducer: (state = INITIAL_STATE, action) => {
      switch (action.type) {
        case LIST_SEARCH:
          return state.setIn(['listView', 'ui', 'search'], action.payload);
        case SET_LIST_FILTER: {
          // set filter
          let filters = state.getIn(['listView', 'ui', 'filters']);
          const index = filters.findIndex(ftr => ftr.get('name') === action.payload.name);

          if (index !== -1) {
            const filter = filters.get(index);
            filters = filters.set(index, filter.set('value', action.payload.value));
          } else {
            filters = filters.push(Map({
              name: action.payload.name,
              value: action.payload.value
            }));
          }

          return state.setIn(['listView', 'ui', 'filters'], filters);
        }
        case SET_PAGE:
          return state.setIn(['listView', 'ui', 'page'], action.payload);
        // TODO: decouple action and view, use generic loading and error state?
        case START_FETCH_ALL:
          // set loading
          return state.setIn(['listView', 'ui', 'error'], null)
            .setIn(['listView', 'ui', 'loading'], true);
        case FETCH_ALL_SUCCESS:
          // set responded data and cancel loading
          return state.setIn(['listView', 'data', 'entities'], fromJS(action.payload))
            .setIn(['listView', 'ui', 'error'], null)
            .setIn(['listView', 'ui', 'loading'], false);
        case FETCH_ALL_FAILURE:
          // set error and cancel loading
          return state.setIn(['listView', 'ui', 'error'], action.payload)
            .setIn(['listView', 'ui', 'loading'], false);
        case START_FETCH_BY:
          // set loading
          return state.setIn(['listView', 'ui', 'error'], null)
            .setIn(['listView', 'ui', 'loading'], true);
        case FETCH_BY_SUCCESS:
          // set responded data and cancel loading
          return state.setIn(['listView', 'data', 'entities'], fromJS(action.payload))
            .setIn(['listView', 'ui', 'error'], null)
            .setIn(['listView', 'ui', 'loading'], false);
        case FETCH_BY_FAILURE:
          // set error and cancel loading
          return state.setIn(['listView', 'ui', 'error'], action.payload)
            .setIn(['listView', 'ui', 'loading'], false);
        case START_FETCH:
          // set loading
          return state.setIn(['editView', 'ui', 'error'], null)
            .setIn(['editView', 'ui', 'loading'], true);
        case FETCH_SUCCESS:
          // set responded data and cancel loading
          return state.setIn(['editView', 'data', 'entity'], fromJS(action.payload))
            .setIn(['editView', 'ui', 'error'], null)
            .setIn(['editView', 'ui', 'loading'], false);
        case FETCH_FAILURE:
          // set error and cancel loading
          return state.setIn(['editView', 'ui', 'error'], action.payload)
            .setIn(['editView', 'ui', 'loading'], false);
        case UNLISTEN_ALL:
          // no state change
          return state;
        case START_CREATE:
          // set loading
          return state.setIn(['newView', 'ui', 'error'], null)
            .setIn(['newView', 'ui', 'loading'], true);
        case CREATE_SUCCESS:
          // set responded data and cancel loading
          return state.setIn(['newView', 'data', 'entity'], fromJS(action.payload))
            .setIn(['newView', 'ui', 'error'], null)
            .setIn(['newView', 'ui', 'loading'], false);
        case CREATE_FAILURE:
          // set error and cancel loading
          return state.setIn(['newView', 'ui', 'error'], action.payload)
            .setIn(['newView', 'ui', 'loading'], false);
        case START_UPDATE:
          // set loading
          return state.setIn(['editView', 'ui', 'error'], null)
            .setIn(['editView', 'ui', 'loading'], true);
        case UPDATE_SUCCESS:
          // cancel loading
          return state.setIn(['editView', 'ui', 'error'], null)
            .setIn(['editView', 'ui', 'loading'], false);
        case UPDATE_FAILURE:
          // set error and cancel loading
          return state.setIn(['editView', 'ui', 'error'], action.payload)
            .setIn(['editView', 'ui', 'loading'], false);
        case START_REMOVE:
          // set loading
          return state.setIn(['listView', 'ui', 'error'], null)
            .setIn(['listView', 'ui', 'loading'], true);
        case REMOVE_SUCCESS:
          // cancel loading
          return state.setIn(['listView', 'ui', 'error'], null)
            .setIn(['listView', 'ui', 'loading'], false);
        case REMOVE_FAILURE:
          // set error and cancel loading
          return state.setIn(['listView', 'ui', 'error'], action.payload)
            .setIn(['listView', 'ui', 'loading'], false);
        case TOGGLE_CLOSE_DONE:
          // toggle displayClosedDone
          return state.setIn(['listView', 'ui', 'displayClosedDone'],
            !state.getIn(['listView', 'ui', 'displayClosedDone']));
        case SHOW_CONTEXT_MENU:
          // set displayContextMenu, position to show, and related entity
          return state.setIn(['listView', 'ui', 'displayContextMenu'], true)
            .setIn(['listView', 'ui', 'contextMenuLeft'], action.payload.clientX)
            .setIn(['listView', 'ui', 'contextMenuTop'], action.payload.clientY)
            .setIn(['listView', 'data', 'contextMenuEntity'], action.payload.entity);
        case HIDE_CONTEXT_MENU:
          // reset displayContextMenu to false, need to keep the contextMenuEntity
          return state.setIn(['listView', 'ui', 'displayContextMenu'], false);
        default:
          return state;
      }
    },

    listSearch: (value) => ({
      type: LIST_SEARCH,
      payload: value
    }),

    setListFilter: (name, value) => ({
      type: SET_LIST_FILTER,
      payload: { name, value }
    }),

    setPage: page => ({
      type: SET_PAGE,
      payload: page
    }),

    /** Make the server request, using redux-thunk */
    fetchAll: () => (dispatch, getState) => {
      dispatch(startFetchAll());

      const apiUrl = getState()[entityUrl].getIn(['entityConfig', 'apiUrl']);

      StoreFactory.getInstance().retrieveAndListen(apiUrl, entities => {
        if (!entities) {
          dispatch(fetchAllFailure('not found'));
        } else {
          dispatch(fetchAllSuccess(entities));
        }
      });
    },

    fetchBy: (key, value) => (dispatch, getState) => {
      dispatch(startFetchBy(key, value));

      const apiUrl = getState()[entityUrl].getIn(['entityConfig', 'apiUrl']);

      StoreFactory.getInstance().retrieveBy(apiUrl, key, value, entities => {
        if (!entities) {
          dispatch(fetchByFailure('not found'));
        } else {
          dispatch(fetchBySuccess(entities));
        }
      });
    },

    /** Make the server request, using redux-thunk */
    fetch: _id => (dispatch, getState) => {
      dispatch(startFetch(_id));

      const apiUrl = getState()[entityUrl].getIn(['entityConfig', 'apiUrl']);

      StoreFactory.getInstance().retrieveOne(apiUrl, _id, entity => {
        dispatch(fetchSuccess(entity));

        if (!entity) {
          dispatch(fetchFailure('entity not found'));
        }
      });
    },

    /** Make the server request, using redux-thunk */
    unlistenAll: () => (dispatch, getState) => {
      const apiUrl = getState()[entityUrl].getIn(['entityConfig', 'apiUrl']);

      StoreFactory.getInstance().unlistenAll(apiUrl);
    },

    /** Make the server request, using redux-thunk */
    create: (fields, redirectUrl) => (dispatch, getState) => {
      const user = getState().users.getIn(['data', 'user']);
      const mergedFields = Object.assign(fields, {
        username: user && user.get('username'),
        createdAt: moment().format('YYYY-MM-DD')
      });

      dispatch(startCreate(mergedFields, redirectUrl));

      const apiUrl = getState()[entityUrl].getIn(['entityConfig', 'apiUrl']);

      StoreFactory.getInstance().insert(apiUrl, mergedFields, (error, _id) => {
        if (error) {
          dispatch(createFailure(error));
        } else {
          const createdEntity = fromJS(Object.assign({}, mergedFields, { _id }));
          dispatch(createSuccess(createdEntity));

          // TODO: need shorthand action to redirect to different view?
          // TODO: need generic redirect mechanism after any action finish?
          if (redirectUrl) {
            dispatch(push(redirectUrl));
          }
        }
      });
    },

    /** Make the server request, using redux-thunk */
    update: (_id, fields, redirectUrl) => (dispatch, getState) => {
      dispatch(startUpdate(_id, fields, redirectUrl));

      const apiUrl = getState()[entityUrl].getIn(['entityConfig', 'apiUrl']);

      StoreFactory.getInstance().update(apiUrl, _id, fields, error => {
        if (error) {
          dispatch(updateFailure(error));
        } else {
          dispatch(updateSuccess(fields));

          if (redirectUrl) {
            dispatch(push(redirectUrl));
          }
        }
      });
    },

    /** Make the server request, using redux-thunk */
    remove: _id => (dispatch, getState) => {
      dispatch(startRemove(_id));

      const apiUrl = getState()[entityUrl].getIn(['entityConfig', 'apiUrl']);

      StoreFactory.getInstance().remove(apiUrl, _id, error => {
        if (error) {
          dispatch(removeFailure(error));
        } else {
          dispatch(removeSuccess(_id));
        }
      });
    },

    toggleClosedDone: () => ({
      type: TOGGLE_CLOSE_DONE
    }),

    showContextMenu: (clientX, clientY, entity) => ({
      type: SHOW_CONTEXT_MENU,
      payload: { clientX, clientY, entity }
    }),

    hideContextMenu: () => ({
      type: HIDE_CONTEXT_MENU
    })
  };

  /**
   * Dispatch this when start a fetch process
   */
  function startFetchAll() {
    return {
      type: START_FETCH_ALL
    };
  }

  /**
   * Dispatch this when get a successful response
   */
  function fetchAllSuccess(entities) {
    return {
      type: FETCH_ALL_SUCCESS,
      payload: entities
    };
  }

  /**
   * Dispatch this when get a failed response
   */
  function fetchAllFailure(error) {
    return {
      type: FETCH_ALL_FAILURE,
      payload: error
    };
  }

  /**
   * Dispatch this when start a fetch process
   */
  function startFetchBy(key, value) {
    return {
      type: START_FETCH_BY,
      payload: { key, value }
    };
  }

  /**
   * Dispatch this when get a successful response
   */
  function fetchBySuccess(entities) {
    return {
      type: FETCH_BY_SUCCESS,
      payload: entities
    };
  }

  /**
   * Dispatch this when get a failed response
   */
  function fetchByFailure(error) {
    return {
      type: FETCH_BY_FAILURE,
      payload: error
    };
  }

  /**
   * Dispatch this when start a fetch process
   */
  function startFetch(_id) {
    return {
      type: START_FETCH,
      payload: _id
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
  function startCreate(mergedFields, redirectUrl) {
    return {
      type: START_CREATE,
      payload: { mergedFields, redirectUrl }
    };
  }

  /**
   * Dispatch this when get a successful response
   */
  function createSuccess(entity) {
    return {
      type: CREATE_SUCCESS,
      payload: entity
    };
  }

  /**
   * Dispatch this when get a failed response
   */
  function createFailure(error) {
    return {
      type: CREATE_FAILURE,
      payload: error
    };
  }

  /**
   * Dispatch this when start a create process
   */
  function startUpdate(_id, fields, redirectUrl) {
    return {
      type: START_UPDATE,
      payload: { _id, fields, redirectUrl }
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

  /**
   * Dispatch this when start a create process
   */
  function startRemove(_id) {
    return {
      type: START_REMOVE,
      payload: _id
    };
  }

  /**
   * Dispatch this when get a successful response
   */
  function removeSuccess(_id) {
    return {
      type: REMOVE_SUCCESS,
      payload: _id
    };
  }

  /**
   * Dispatch this when get a failed response
   */
  function removeFailure(error) {
    return {
      type: REMOVE_FAILURE,
      payload: error
    };
  }
}
