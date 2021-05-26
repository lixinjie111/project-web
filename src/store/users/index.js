import mutations from './mutations'
import actions from './actions'

const state = {
  accessToken: '', // 登录token
  refreshToken: '', // 刷新token
  userInfo: {}, // 用户信息
}

export default {
  state,
  mutations,
  actions
}
