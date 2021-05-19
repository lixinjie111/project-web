import * as types from './mutation-types'

export default {
  initTopMenu ({commit}, menu) {
    commit(types.INIT_TOP_MENU, menu)
  },
  activeFirstMenu ({commit}, menu) {
    commit(types.ACTIVE_FIRST_MENU, menu)
  },
  activeSecondMenu ({commit}, menu) {
    commit(types.ACTIVE_SECOND_MENU, menu)
  },
  activeThirdMenu ({commit}, menu) {
    commit(types.ACTIVE_THIRD_MENU, menu)
  },
  navMenu ({commit}, menu) {
    commit(types.NAV_MENU, menu)
  },
  activeNavMenu ({commit}, menu) {
    commit(types.ACTIVE_NAV_MENU, menu)
  },
  initUserInfo ({commit}, userInfo) {
    commit(types.INIT_USER_INFO, userInfo)
  },
  removeUserInfo ({commit}) {
    commit(types.REMOVE_USER_INFO)
  },
  initPermission({commit}, permissionList){
      commit(types.INIT_PERMISSION, permissionList)
  }
}
