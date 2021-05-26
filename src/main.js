import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Xui from 'x-intelligent-ui'
// import 'x-intelligent-ui/dist/main.css'
// 替换 'x-intelligent-ui/dist/main.css' 覆盖组件库样式
import '@/assets/css/x-intelligent-ui/main.css'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

import '@/assets/css/reset.css'
import '@/assets/iconfont/iconfont.css'

import * as api from '@/api/index'

// 引入自定义组件
import initGlobalComponents from './components'
initGlobalComponents();

Vue.config.productionTip = false

Vue.use(Xui)
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VXETable)

Vue.prototype.$api = api

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
