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
  initPermission({commit}, permissionList){
      commit(types.INIT_PERMISSION, permissionList)
  },
  removeMenuData({commit}) {
    commit(types.REMOVE_MENU_DATA)
  },
  removePermission({commit}){
    commit(types.REMOVE_PERMISSION)
  }
}
