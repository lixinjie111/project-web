import Simple from '@/layout/SimpleNav.vue'
import Staff from '@/views/statistics/staff.vue'

export default {
  name: '统计',
  path: '',
  component: Simple,
  meta: {
    isAuth: false
  },
  children: [
    {path: '/statistics/staff', component: Staff, name: '人员', meta: { isAuth: false }}
  ]
}