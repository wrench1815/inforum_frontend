export const getters = {
  // If any User is Logged in or not
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  // Returns curretly Logged In User data
  loggedInUser(state) {
    return state.auth.user.user
  },

  // Returns curretly Logged In User Role
  loggedInUserRole(state) {
    if (state.auth.loggedIn) {
      return state.auth.user.userRole[0]
    } else {
      return ''
    }
  },
}
