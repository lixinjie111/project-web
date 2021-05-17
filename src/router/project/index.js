import Simple from '@/layout/SimpleNav.vue'
import Overview from '@/views/project/overview.vue'

export default {
  name: '项目',
  path: '',
  component: Simple,
  meta: {
    icon: '',
    permissionKey: 'project'
  },
  children: [
    {path: '/project/overview', component: Overview, name: '概览', meta: {icon: '', permissionKey: 'overview', permissionParent: 'project' }},
  ]
}