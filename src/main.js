import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
