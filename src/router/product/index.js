import Empty from '@/layout/EmptyLayout.vue'
import Overview from '@/views/product/overview.vue'

export default {
  name: '产品',
  path: '',
  component: Empty,
  meta: {
    icon: '',
    permissionKey: 'product'
  },
  children: [
    {path: '/product/overview', component: Overview, name: '概览', meta: {icon: '', permissionKey: 'overview', permissionParent: 'product' }},
  ]
}