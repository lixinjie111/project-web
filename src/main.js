import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Xui from 'x-intelligent-ui'
import 'x-intelligent-ui/dist/main.css'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

Vue.config.productionTip = false

Vue.use(Xui)
Vue.use(Vuex)
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
