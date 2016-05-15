/* global $ */
import { fromJS } from 'immutable';
import StoreFactory from '../store/store-factory';
import enquiryModule from './enquiries';
import purchaseOrderModule from './purchase-orders';
import documentModule from './documents';
import cashFlowModule from './cash-flows';

// Login
const START_LOGIN = 'users/START_LOGIN';
const LOGIN_SUCCESS = 'users/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'users/LOGIN_FAILURE';

// Logout
const LOGOUT = 'users/START_LOGOUT';

const INITIAL_STATE = fromJS({
  entityConfig: {
    fields: [
      { label: 'Email', name: 'email', type: 'text' },
      { label: 'PW', name: 'password', type: 'password' }
    ]
  },
  ui: {
    loading: false,
    error: null
  },
  data: {
    user: null
  }
});

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case START_LOGIN:
      // set loading
      return state.setIn(['ui', 'error'], null)
        .setIn(['ui', 'loading'], true);
    case LOGIN_SUCCESS: {
      // set responded data and cancel loading
      return state.setIn(['data', 'user'], fromJS(action.payload))
        .setIn(['ui', 'error'], null)
        .setIn(['ui', 'loading'], false);
    }
    case LOGIN_FAILURE:
      // set error and cancel loading
      return state.setIn(['ui', 'error'], action.payload)
        .setIn(['ui', 'loading'], false);
    case LOGOUT: {
      $.localStorage.remove('user');

      // set loading
      return state.setIn(['data', 'user'], null);
    }
    default:
      return state;
  }
}

export function login(email, password) {
  return dispatch => {
    dispatch(startLogin());

    StoreFactory.getInstance().login(email, password, (error, authData) => {
      if (error) {
        dispatch(loginFailure(error));
      } else {
        // turn matthew-cheng@email.com to Matthew Cheng
        const emailTokens = authData.password.email.replace(/@.*/, '').split('-');
        let accountName = 'master';
        let username;

        if (emailTokens.length === 1) {
          // handle master account, e.g. Penny@123.com
          username = emailTokens[0].replace(/\b\w/g, m => (
            m.toUpperCase()
          ));
        } else {
          // handle other accont, e.g. ppp-mon@appx.hk
          accountName = emailTokens[0];

          username = emailTokens[1].replace(/\b\w/g, m => (
            m.toUpperCase()
          ));
        }

        const user = { email, password, username, accountName };

        // Apply account ACL config to all modules
        dispatch(enquiryModule.applyAcl(accountName));
        dispatch(purchaseOrderModule.applyAcl(accountName));
        dispatch(documentModule.applyAcl(accountName));
        dispatch(cashFlowModule.applyAcl(accountName));

        // Apply user ACL config to all modules
        dispatch(enquiryModule.applyAcl(email));
        dispatch(purchaseOrderModule.applyAcl(email));
        dispatch(documentModule.applyAcl(email));
        dispatch(cashFlowModule.applyAcl(email));

        // Set user object to localStorage for autoLogin use
        $.localStorage.set('user', user);

        // Set default filters of all modules
        dispatch(enquiryModule.setListFilter('sales', user.username));
        dispatch(purchaseOrderModule.setListFilter('sales', user.username));
        dispatch(documentModule.setListFilter('username', user.username));
        dispatch(cashFlowModule.setListFilter('sales', user.username));

        dispatch(loginSuccess(user));
      }
    });
  };
}

export function autoLogin() {
  const user = $.localStorage.get('user');

  if (user) {
    return login(user.email, user.password);
  }

  return () => {};
}

export function logout() {
  return { type: LOGOUT };
}

/**
 * Dispatch this when start a fetch process
 */
function startLogin() {
  return {
    type: START_LOGIN
  };
}

/**
 * Dispatch this when get a successful response
 */
function loginSuccess(entity) {
  return {
    type: LOGIN_SUCCESS,
    payload: entity
  };
}

/**
 * Dispatch this when get a failed response
 */
function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    payload: error
  };
}
