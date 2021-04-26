import Login from '../views/login/index'
import Home from '../views/home/index'
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
        name: 'home',
        path: '/home',
        alias: '/',
        component: Home,
        meta: {
            title: '首页',
            isNeedLogin: true, // 是否需要登录
        }
        // children: [

        // ]
    }
]

export default routes;