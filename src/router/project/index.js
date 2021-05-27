import Empty from '@/layout/EmptyLayout.vue'
import Home from '@/views/project/home.vue'

export default {
  name: '项目',
  path: '',
  component: Empty,
  meta: {
    isAuth: false
  },
  children: [
    {path: '/project/home', component: Home, name: '首页', meta: { isAuth: false }}
  ]
}