import * as types from './mutation-types'

export default {
  [types.SET_ARCHIVE_ID] (state, id) {
    state.archiveId = id
  }
}