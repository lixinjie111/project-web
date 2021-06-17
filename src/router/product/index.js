import Simple from '@/layout/SimpleNav.vue'
import Overview from '@/views/product/overview.vue'

export default {
  name: '产品',
  path: '',
  component: Simple,
  meta: {
    isAuth: true
  },
  children: [
    {path: '/product/overview', component: Overview, name: '概览', meta: { isAuth: true }}
  ]
}