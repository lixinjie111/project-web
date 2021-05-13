import Vue from 'vue'

import confirm from 'components/confirm'

function initGlobalComponents () {
  Vue.prototype.$confirms = confirm
}

export default initGlobalComponents;