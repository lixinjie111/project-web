import Vue from 'vue'
import ContentHeader from '@/components/ContentHeader.vue'
import MenuNav from '@/components/menu/MenuNav.vue'
import Pagination from '@/components/pagination/Pagination.vue'

import confirm from '@/components/confirm'

function initGlobalComponents () {
  // base
  Vue.component(ContentHeader.name, ContentHeader)
  Vue.component(MenuNav.name, MenuNav)
  Vue.component(Pagination.name, Pagination)

  Vue.prototype.$confirms = confirm
}

export default initGlobalComponents;