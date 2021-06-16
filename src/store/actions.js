import * as types from './mutation-types'
import * as api from '@/api/index'

export default {
  initDeptTree ({state, commit}, refresh) {
    return new Promise(async (resolve, reject) => {
      if(!state.deptTree.length || refresh) {
        let {code, data} = await api.org.getDeptTree();
        if(code == 0){
          commit(types.INIT_DEPT_TREE, data);
          resolve()
        } else {
          reject()
        }
      } else {
        resolve()
      }
    }).catch(error => {
      reject()
    })
  },
}