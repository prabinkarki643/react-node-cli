import { combineReducers } from 'redux';

import globalReducer from './global/reducer';
import userReducer from './user/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    global: globalReducer,
    user:userReducer,
    ...injectedReducers,
  });

  return rootReducer;
}