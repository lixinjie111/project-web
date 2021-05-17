export default [
  {
    name: '组织',
    path: '',
    level: 1,
    meta: {
      icon: '',
      permissionKey: 'org'
    },
    children: [
      {path: '/org/users', name: '用户', level: 2, meta: {icon: '', permissionKey: 'users', permissionParent: 'org' }},
      {path: '/org/depart',  name: '部门', level: 2, meta: {icon: '', permissionKey: 'depart', permissionParent: 'org' }},
      {path: '/org/role',  name: '角色', level: 2, meta: {icon: '', permissionKey: 'role', permissionParent: 'org' }},
    ]
  },
  {
    name: '项目',
    path: '',
    level: 1,
    meta: {
      icon: '',
      permissionKey: 'project'
    },
    children: [
      {path: '/project/overview', name: '概览', level: 2, meta: {icon: '', permissionKey: 'overview', permissionParent: 'project'}}
    ]
  }
]