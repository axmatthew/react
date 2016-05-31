import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from '../modules';

export default function configureStore(browserHistory) {
  const loggerMiddleware = createLogger();

  const createdRouterMiddleware = routerMiddleware(browserHistory);

  const enhancer = applyMiddleware(createdRouterMiddleware, thunkMiddleware, loggerMiddleware);

  const store = createStore(reducer, undefined, compose(
    enhancer,
    // redux-devtools (Chrome plugin)
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
}
