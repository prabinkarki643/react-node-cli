// For About Selector please below
// https://medium.com/@matthew.holman/what-is-a-redux-selector-a517acee1fe8
// https://github.com/reduxjs/reselect#createselectorinputselectors--inputselectors-resultfunc
export const getIsLoggedIn = (state) =>
  state.user?.currentUser?.user && state.user?.currentUser?.token
    ? true
    : false;
