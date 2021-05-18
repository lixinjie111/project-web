import Simple from '@/layout/SimpleNav.vue'
import Overview from '@/views/product/overview.vue'

export default {
  name: '产品',
  path: '',
  component: Simple,
  meta: {
    icon: '',
    permissionKey: 'product'
  },
  children: [
    {path: '/product/overview', component: Overview, name: '概览', meta: {icon: '', permissionKey: 'overview', permissionParent: 'product' }},
  ]
}