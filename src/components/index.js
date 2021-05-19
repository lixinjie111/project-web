import Vue from 'vue'
import ContentHeader from '@/components/ContentHeader.vue'

import confirm from '@/components/confirm'

function initGlobalComponents () {
  // base
  Vue.component(ContentHeader.name, ContentHeader)

  Vue.prototype.$confirms = confirm
}

export default initGlobalComponents;