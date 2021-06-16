import * as types from './mutation-types'

export default {
  [types.INIT_DEPT_TREE] (state, list) {
    state.deptTree = list
  }
}