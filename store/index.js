// state
export const state = () => ({
  privacyAccepted: false,
})

// mutations
export const mutations = {
  acceptPrivacy(state) {
    localStorage.setItem('privacyAccepted', true)
    state.privacyAccepted = localStorage.getItem('privacyAccepted')
  },

  statusPrivacy(state) {
    state.privacyAccepted = localStorage.getItem('privacyAccepted')
  },
}

// getters
export const getters = {
  // If any User is Logged in or not
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  // Returns curretly Logged In User data
  loggedInUser(state) {
    if (state.auth.loggedIn) {
      return state.auth.user.user
    } else {
      return null
    }
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
