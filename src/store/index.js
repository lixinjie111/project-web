import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

// 持久化
import createPersistedState from "vuex-persistedstate"

// 模块
import system from '@/store/system'
import users from '@/store/users'
import task from '@/store/task'

Vue.use(Vuex)

const persistedState = createPersistedState({
  storage: window.sessionStorage
})


const state = {
  deptTree: [], // 部门树
}

export default new Vuex.Store({
  namespaced: true,
  state,
  mutations,
  actions,
  modules: {
    system,
    users,
    task,
  },
  plugins: [persistedState]
})
