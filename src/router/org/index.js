import Simple from '@/layout/SimpleNav.vue'
import User from '@/views/org/user.vue'
import Depart from '@/views/org/depart.vue'
import Role from '@/views/org/role.vue'
import Dynamic from '@/views/org/dynamic.vue'
import Operation from '@/views/org/operation.vue'
import Member from '@/views/org/member.vue'

export default {
  name: '组织',
  path: '',
  component: Simple,
  meta: {
    isAuth: true
  },
  children: [
    {path: '/org/users', component: User, name: '用户', meta: { isAuth: true }},
    {path: '/org/depart', component: Depart, name: '部门', meta: { isAuth: true }},
    {path: '/org/role', component: Role, name: '角色', meta: { isAuth: true }},
    {path: '/org/dynamic', component: Dynamic, name: '动态', meta: { isAuth: true }},
    {path: '/org/operat', component: Operation, name: '角色分组', meta: {isAuth: true, permissionKey: 'sys_role_perm', entryPath: '/org/role' }},
    {path: '/org/member', component: Member, name: '组员管理', meta: {isAuth: true, permissionKey: 'sys_user_batch_role', entryPath: '/org/role' }}
  ]
}