import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

// 持久化
import createPersistedState from "vuex-persistedstate"

// 模块
import system from '@/store/system'

Vue.use(Vuex)

const persistedState = createPersistedState({
  storage: window.sessionStorage
})


const state = {}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    system
  },
  plugins: [persistedState]
})