import mutations from './mutations'
import actions from './actions'

const state = {
  menuMap: {}, // 所有的菜单Map，键值为层级 level-1,
  menuList: [], // 所有菜单列表
  topMenu: [], // 顶级节点
  firstMenu: {}, // 当前的一级菜单 --- 当前激活侧边栏
  secondMenu: {}, // 当前的二级菜单 --- 横向算是二级菜单或三级菜单
  thirdMenu: {}, // 当前的三级菜单
  navMenu: [], // 当前横向菜单 --- 横向菜单
  activeNavMenu: {}, // 横向激活菜单
  permission: [] ,// 页面按钮权限
}

export default {
  state,
  mutations,
  actions
}
