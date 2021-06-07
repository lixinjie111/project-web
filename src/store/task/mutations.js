import * as types from './mutation-types'

export default {
  [types.MEMBER_LIST] (state, data, projectId, memberLoaded) {
    state.memberLoaded = memberLoaded;
    state.projectId = projectId;
    state.memberList = data.map(item => {
      return {
        // id: item.userId,
        // key: item.userId,
        // label: item.userName,
        userName: item.userName,
        userId: item.userId,
        userRole: item.userRole,
      }
    });
  },
}
