export const state = () => ({
  logged: false,
  fetching: false,
  error: {
    status: false,
    response: {}
  },
  userInfo: {}
})

export const getters = {
  requestAuth: (state) => {
    if (process.env.mode !== 'dev' && !state.logged) {
      return true
    }
    else {
      return false
    }
  }
}

export const mutations = {
  SET_LOGIN_STATE: (state, status) => { state.logged = status },
  SET_FETCHING_STATE: (state, status) => { state.fetching = status },
  SET_ERROR: (state, payload) => { state.error = payload },
  SET_USER_INFO: (state, payload) => { state.userInfo = payload }
}
