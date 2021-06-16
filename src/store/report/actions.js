import * as types from './mutation-types'

export default {
  initArchiveId({commit}, id){
    commit(types.SET_ARCHIVE_ID, id)
  }
}