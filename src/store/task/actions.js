import * as types from './mutation-types'
import {getProjectMemberList} from "@/api/task";

export default {
  projectMemberList ({state, commit}, projectId) {
    if (state.projectId == projectId) {
      return;
    }

    getProjectMemberList(projectId).then(res => {
      if (res.code === 0 && res.data) {
        commit(types.MEMBER_LIST, res.data, projectId, true);
      }
      else {
        commit(types.MEMBER_LIST, [], projectId, false);
      }
    }).catch(err => {
      commit(types.MEMBER_LIST, [], projectId, false);
    })
  },
}
