import Simple from '@/layout/SimpleNav.vue'
import Home from '@/views/task/home.vue'
import Member from '@/views/task/member.vue'

export default {
  name: '项目',
  path: '',
  component: Simple,
  level: 1,
  meta: {
    icon: '',
    permissionKey: 'project'
  },
  children: [
    {path: '/task/home', component: Home, name: '首页', level: 2, meta: {icon: '', permissionKey: 'users', permissionParent: 'project' }},
    {path: '/task/member', component: Member, name: '团队成员', level: 2, meta: {icon: '', permissionKey: 'users', permissionParent: 'project' }},
  ]
}
