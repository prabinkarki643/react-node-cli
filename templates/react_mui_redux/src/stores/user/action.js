import {
  SET_CURRENT_USER,
  SET_USER_PROFILE,
} from "./constants";

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

export function logOut() {
  return {
    type: SET_CURRENT_USER,
    user: {
      user: null,
      token: "",
    },
  };
}

//Example of how to use combination of actions
// export const fetchCurrentUserProfile = () => async (dispatch, getState) => {
//   dispatch({
//     type: LOAD_PROFILE,
//   });
//   Auth.fetchUserProfile()
//     .then((profile) => {
//       console.log("profile",profile);
//       dispatch({
//         type: LOAD_PROFILE_SUCCESS,
//         profile: profile,
//       });
//     })
//     .catch((err) => {
//       dispatch({
//         type: LOAD_PROFILE_ERROR,
//         error: err,
//       });
//     });
// };

export function setUserProfile(profile) {
  return {
    type: SET_USER_PROFILE,
    profile,
  };
}
