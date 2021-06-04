import * as types from './mutation-types'

export default {
  [types.MEMBER_LIST] (state, data, projectId, memberLoaded) {
    state.memberLoaded = memberLoaded;
    state.projectId = projectId;
    state.memberList = data;
  },
}
