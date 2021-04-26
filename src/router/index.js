// import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './home'

const router = {
    mode:'history', // 对应的是 html5 的history API 有状态的路由
    // linkActiveClass:'is-active', // router-link激活的默认样式定义
    routes
}

// 构建VueRouter对象
let vueRouter = new VueRouter(router)
// 拦截路由，进行授权判断和缓存限制
vueRouter.beforeEach((to, from, next) => {
    var menuList = [];
    var menuMap = JSON.parse(sessionStorage.getItem('menuMap'));
    for (var p in menuMap) {
        if (menuMap[p].href && menuMap[p].href != '') {
            menuList.push(menuMap[p].href)
        }
    }
    if (to.meta.isNeedLogin) {
        // TODO 验证用户是否登录，以及用户是否有访问该路由的权限
        if (menuList.indexOf(to.path) > -1 || to.path == '/') {
            next()
        } else {
            let redirectUrl = {path: '/login'};
            redirectUrl = to.name !== 'login' ? {query: { redirect: to.fullPath }, ...redirectUrl} : redirectUrl;
            next(redirectUrl)
        }
    } else {
        // if (menuList.indexOf(to.path) > -1 || to.path == '/') {
            next()
        // } else {
            // next(false);
        // }
    }
    
    // TODO 如果没有登录，则跳转到登录界面
    // if (!sessionStorage.getItem('accessToken')) {
    //     let redirectUrl = {path: '/login'};
    //     redirectUrl = to.name !== 'login' ? {query: { redirect: to.fullPath }, ...redirectUrl} : redirectUrl;
    //     next(redirectUrl)
    // }
})


export default vueRouter