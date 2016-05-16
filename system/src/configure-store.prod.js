import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './modules/index';

export default function configureStore(browserHistory) {
  const createdRouterMiddleware = routerMiddleware(browserHistory);

  const enhancer = applyMiddleware(createdRouterMiddleware, thunkMiddleware);

  const store = createStore(reducer, undefined, enhancer);

  return store;
}
