import Empty from '@/layout/EmptyLayout.vue'
import Overview from '@/views/product/overview.vue'

export default {
  name: '产品',
  path: '',
  component: Empty,
  meta: {
    isAuth: true
  },
  children: [
    {path: '/product/overview', component: Overview, name: '概览', meta: { isAuth: true }}
  ]
}