import * as types from './mutation-types'

export default {
  [types.SET_USER_INFO] (state, userInfo) {
    state.userInfo = userInfo
  },
  [types.REMOVE_USER_INFO] (state) {
    state.userInfo = {}
  },
  [types.SET_ACCESS_TOKEN] (state, token) {
    state.accessToken = token
  },
  [types.REMOVE_ACCESS_TOKEN] (state) {
    state.accessToken = ''
  },
  [types.SET_REFRESH_TOKEN] (state, token) {
    state.refreshToken = token
  },
  [types.REMOVE_REFRESH_TOKEN] (state) {
    state.refreshToken = ''
  },
}
