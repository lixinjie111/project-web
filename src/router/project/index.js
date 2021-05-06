import EmptyLayout from '@/views/layout/EmptyLayout.vue'
import User from '@/views/project/home.vue'
import Depart from '@/views/org/depart.vue'
import Role from '@/views/org/role.vue'

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
    {path: '/project/home', component: User, name: '首页', level: 2, meta: {icon: '', permissionKey: 'users', permissionParent: 'project' }},
    {path: '/project/depart', component: Depart, name: '项目1', level: 2, meta: {icon: '', permissionKey: 'depart', permissionParent: 'project' }},
    {path: '/project/role', component: Role, name: '项目2', level: 2, meta: {icon: '', permissionKey: 'role', permissionParent: 'project' }},
    {path: '/project/home/task', component: Depart, name: '首页-项目1', level: 3, meta: {icon: '', permissionKey: 'depart', permissionParent: 'project' }}
  ]
}