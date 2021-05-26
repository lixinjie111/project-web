import * as types from './mutation-types'

export default {
  setUserInfo ({commit}, userInfo) {
    commit(types.SET_USER_INFO, userInfo)
  },
  removeUserInfo ({commit}) {
    commit(types.REMOVE_USER_INFO)
  },
  setAccessToken ({commit}, token) {
    commit(types.SET_ACCESS_TOKEN, token)
  },
  removeAccessToken ({commit}) {
    commit(types.REMOVE_ACCESS_TOKEN)
  },
  setRefreshToken ({commit}, token) {
    commit(types.SET_REFRESH_TOKEN, token)
  },
  removeRefreshToken ({commit}) {
    commit(types.REMOVE_REFRESH_TOKEN)
  },
  logOut({commit}){
    return new Promise((resolve, reject) => {
      commit(types.SET_USER_INFO, {})
      commit(types.SET_ACCESS_TOKEN, '')
      commit(types.SET_REFRESH_TOKEN, '')
      resolve()
    })
  }
}
