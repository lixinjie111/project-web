import Login from '@/views/login/login.vue'
import Forgetpwd from '@/views/login/forgetpwd.vue'
import DefaultLayout from '@/layout/DefaultLayout.vue' // 默认左右结构
import Org from './org'
import Product from './product'
import Project from './project'
import Task from './task'
/*
* 页面结构
*/
let routes = [
    {
        name: 'login',
        path: '/login',
        component: Login,
        meta: {
            title: '登录',
            isNeedLogin: false
        }
    },
    {
        name: 'forgetpwd',
        path: '/forgetpwd',
        component: Forgetpwd,
        meta: {
            title: '忘记密码',
            isNeedLogin: false
        }
    },
    {
        name: 'home',
        path: '/',
        component: DefaultLayout,
        // level: 'top', // 顶层菜单
        meta: {
            isNeedLogin: true, // 是否需要登录
        },
        children: [
            Org,
            Product,
            Project,
            Task,
        ]
    }
]

export default routes;
