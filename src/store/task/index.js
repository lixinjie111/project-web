import mutations from './mutations'
import actions from './actions'

const state = {
  projectId: 0, // 当前项目ID
  memberList: [], // 项目成员
  memberLoaded: false,  // 是否加载成员
}

export default {
  state,
  mutations,
  actions
}
