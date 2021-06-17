import Simple from '@/layout/SimpleNav.vue'
import Home from '@/views/project/home.vue'

export default {
  name: '项目',
  path: '',
  component: Simple,
  meta: {
    isAuth: true
  },
  children: [
    {path: '/project/home', component: Home, name: '首页', meta: { isAuth: true }}
  ]
}