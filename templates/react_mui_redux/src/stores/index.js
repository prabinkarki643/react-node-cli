import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from 'redux'
import createReducer from './reducers';
import history from '../utils/history';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunk, routerMiddleware(history)];

const enhancers = [applyMiddleware(...middlewares)]

const store = createStore(
    createReducer(),
    composeEnhancers(...enhancers),
)

  // Extensions
  store.injectedReducers = {}; // Reducer registry

  /**
   * Create an inject reducer function,
   * This function adds the async reducer, and creates a new combined reducer
   * Eg:
   * const key = "orders";
   * store.injectReducer(key, ordersReducer);
   * @param {string} key reducerName
   * @param {any} injectedReducer  reducer
   */
  store.injectReducer = (key, injectedReducer) => {
    store.injectedReducers[key] = injectedReducer
    store.replaceReducer(createReducer(store.injectedReducers))
  }

  // Return the modified root store
export const rootStore = store
export const ReduxProvider = Provider
