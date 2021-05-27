export default [
    {
        name: '我的',
        path: '',
        level: 1,
        meta: {
            icon: '',
            permissionKey: 'mine'
        },
        children: [
            {
                path: '/mine/home',
                name: '首页',
                level: 2,
                meta: {icon: '', permissionKey: 'home', permissionParent: 'mine'}
            },
            {
                path: '/mine/project',
                name: '项目',
                level: 2,
                meta: {icon: '', permissionKey: 'project', permissionParent: 'mine'}
            },
            {
                path: '/mine/task',
                name: '任务',
                level: 2,
                meta: {icon: '', permissionKey: 'task', permissionParent: 'mine'}
            },
            {
                path: '/mine/dynamic',
                name: '动态',
                level: 2,
                meta: {icon: '', permissionKey: 'dynamic', permissionParent: 'mine'}
            }
        ]
    },
    {
        name: '组织',
        path: '',
        level: 1,
        meta: {
            icon: '',
            permissionKey: 'org'
        },
        children: [
            {
                path: '/org/users',
                name: '用户',
                level: 2,
                meta: {icon: '', permissionKey: 'users', permissionParent: 'org'}
            },
            {
                path: '/org/depart',
                name: '部门',
                level: 2,
                meta: {icon: '', permissionKey: 'depart', permissionParent: 'org'}
            },
            {
                path: '/org/role',
                name: '角色',
                level: 2,
                meta: {icon: '', permissionKey: 'role', permissionParent: 'org'}
            },
        ]
    },
    {
        name: '产品',
        path: '',
        level: 1,
        meta: {
            icon: '',
            permissionKey: 'product'
        },
        children: [
            {
                path: '/product/overview',
                name: '概览',
                level: 2,
                meta: {icon: '', permissionKey: 'overview', permissionParent: 'product'}
            }
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
            {
                path: '/project/home',
                name: '首页',
                level: 2,
                meta: {icon: '', permissionKey: 'home', permissionParent: 'project'}
            }
        ]
    },
    {
        name: '周报',
        path: '',
        level: 1,
        meta: {
            icon: '',
            permissionKey: 'report'
        },
        children: [
            {
                path: '/report/notarchive',
                name: '未归档',
                level: 2,
                meta: {icon: '', permissionKey: 'notarchive', permissionParent: 'report'}
            },
            {
                path: '/report/archive',
                name: '已归档',
                level: 2,
                meta: {icon: '', permissionKey: 'archive', permissionParent: 'report'}
            }
        ]
    },
    {
        name: '统计',
        path: '',
        level: 1,
        meta: {
            icon: '',
            permissionKey: 'statistics'
        },
        children: [
            {
                path: '/statistics/staff',
                name: '人员',
                level: 2,
                meta: {icon: '', permissionKey: 'staff', permissionParent: 'statistics'}
            }
        ]
    }
]