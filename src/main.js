import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Xui from 'x-intelligent-ui'
import 'x-intelligent-ui/dist/main.css'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import '@/assets/css/reset.css'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

Vue.config.productionTip = false

Vue.use(Xui)
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VXETable)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
