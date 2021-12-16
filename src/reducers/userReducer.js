export function userReducer(state = null, action) {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return action.payload; // it will contain all user info
    // in start state will be null but after the user logged in state will have user info
    case "LOGOUT":
      return action.payload; // user will be null bcoz of logout
    default:
      return state;
  }
}
// it will contain all user info
// in start state will be null but after the user logged in state will have user info
