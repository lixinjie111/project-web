export default [
    {
        name: '我的',
        path: '',
        id: 1,
        permission: '',
        children: [
            {
                path: '/mine/home',
                name: '首页',
                id: 2,
                children: []
            },
            {
                path: '/mine/project',
                name: '项目',
                id: 3,
                permission: ''
            },
            {
                path: '/mine/task',
                name: '任务',
                id: 4,
                permission: ''
            },
            {
                path: '/mine/dynamic',
                name: '动态',
                id: 5,
                permission: ''
            }
        ]
    },
    {
        name: '组织',
        path: '',
        id: 6,
        permission: '',
        children: [
            {
                path: '/org/users',
                name: '用户',
                id: 7,
                permission: '',
            },
            {
                path: '/org/depart',
                name: '部门',
                id: 8,
                permission: '',
            },
            {
                path: '/org/role',
                name: '角色',
                id: 9,
                permission: '',
            },
        ]
    },
    {
        name: '产品',
        path: '',
        id: 10,
        permission: '',
        children: [
            {
                path: '/product/overview',
                name: '概览',
                id: 11,
                permission: '',
            }
        ]
    },
    {
        name: '项目',
        path: '',
        id: 12,
        permission: '',
        children: [
            {
                path: '/project/home',
                name: '首页',
                id: 13,
                permission: '',
                children: [
                    {path: '/task/home',  name: '任务'},
                    {path: '/task/team', name: '团队'},
                    {path: '/task/archive',  name: '文档'},
                    {path: '/task/dynamic',  name: '动态'},
                  ]
            }
        ]
    },
    {
        name: '周报',
        path: '',
        id: 14,
        permission: '',
        children: [
            {
                path: '/report/notarchive',
                name: '未归档',
                id: 15,
                permission: '',
            },
            {
                path: '/report/archive',
                name: '已归档',
                id: 16,
                permission: '',
            }
        ]
    },
    {
        name: '统计',
        path: '',
        id: 17,
        permission: '',
        children: [
            {
                path: '/statistics/staff',
                name: '人员',
                id: 17,
                permission: '',
            }
        ]
    }
]