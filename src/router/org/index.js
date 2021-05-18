import Simple from '@/layout/SimpleNav.vue'
import User from '@/views/org/user.vue'
import Depart from '@/views/org/depart.vue'
import Role from '@/views/org/role.vue'
import Operation from '@/views/org/operation.vue'
import Member from '@/views/org/member.vue'

export default {
  name: '组织',
  path: '',
  component: Simple,
  meta: {
    icon: '',
    permissionKey: 'org'
  },
  children: [
    {path: '/org/users', component: User, name: '用户', meta: {icon: '', permissionKey: 'users', permissionParent: 'org' }},
    {path: '/org/depart', component: Depart, name: '部门', meta: {icon: '', permissionKey: 'depart', permissionParent: 'org' }},
    {path: '/org/role', component: Role, name: '角色', meta: {icon: '', permissionKey: 'role', permissionParent: 'org' }},
    {path: '/org/operat', component: Operation, name: '角色分组', meta: {icon: '', permissionKey: 'operation', entryPath: '/org/role' }},
    {path: '/org/member', component: Member, name: '组员管理', meta: {icon: '', permissionKey: 'member', entryPath: '/org/role' }}
  ]
}