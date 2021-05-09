import EmptyLayout from '@/layout/EmptyLayout.vue'
import User from '@/views/task/home.vue'

export default {
  name: '项目',
  path: '',
  component: EmptyLayout,
  level: 1,
  meta: {
    icon: '',
    permissionKey: 'project'
  },
  children: [
    {path: '/task/home', component: User, name: '首页', level: 2, meta: {icon: '', permissionKey: 'users', permissionParent: 'project' }},
  ]
}
