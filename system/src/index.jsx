import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configure-store';
import routes from './routes';

// FIXME: shouldn't this will create the <base href> automatically?
const browserHistory = useRouterHistory(createHistory)({
  basename: '/'
});

const store = configureStore(browserHistory);

// react-router-redux: create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
