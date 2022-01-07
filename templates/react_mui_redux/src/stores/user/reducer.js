/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from "immer";
import {
  SET_CURRENT_USER,
  SET_USER_PROFILE,
} from "./constants";

// The initial state of the App
export const initialState = {
  loading: false,
  error: null,
  currentUser: {
    user:null,
    token:''
  },
  userProfile: {
    data:null,
    loading:false,
    error:null
  },
};

/* eslint-disable default-case, no-param-reassign */
const userReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {

      case SET_CURRENT_USER:
        draft.currentUser = action.user;
        break;
      case SET_USER_PROFILE:
        draft.userProfile.data = action.profile;
        break;
    }
  });

export default userReducer;
