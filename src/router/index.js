// import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './home'
import store from '@/store'

const router = {
    mode:'history', // 对应的是 html5 的history API 有状态的路由
    // linkActiveClass:'is-active', // router-link激活的默认样式定义
    routes
}

// 构建VueRouter对象
let vueRouter = new VueRouter(router)

// 拦截路由，进行授权判断和缓存限制
vueRouter.beforeEach((to, from, next) => {
    setStoreMenu(to);
    
    if (to.meta.isNeedLogin) {
        let {menuList} = store.state.system;
        // TODO 验证用户是否登录，以及用户是否有访问该路由的权限
        // if (menuList.indexOf(to.path) > -1 || to.path == '/') {
            next()
        // } else {
        //     let redirectUrl = {path: '/login'};
        //     redirectUrl = to.name !== 'login' ? {query: { redirect: to.fullPath }, ...redirectUrl} : redirectUrl;
        //     next(redirectUrl)
        // }
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

// 重置title
vueRouter.afterEach((to) => {
    // reset the page title
    const title = to.meta && to.meta.title ? to.meta.title : '项目管理';
    document.title = title
    // 从路由的元信息中获取 title 属性
    if (to.meta.title) {
        document.title = to.meta.title;
    }
})

function setStoreMenu(to){
    let path = to.path;
    let {permissionKey, entryPath} = to.meta;
    let {menuList, menuMap, topMenu, firstMenu, secondMenu, permission} = store.state.system;
    if(!topMenu.length) return; // vuex已经缓存菜单
    // 有些页面不在菜单列表，根据数据操作权限 能进入某些页面
    if(permission.indexOf(permissionKey) > -1) {
        getrouterPath(entryPath)
        return ;
    } else if(menuList.indexOf(path) === -1 || path === '/'){
        // 默认地址
        setStore(topMenu[0], firstMenu.children[0], {}, firstMenu.children, secondMenu); // 修改菜单
        return ;
    } else if(menuList.indexOf(path) > -1) { // 有菜单权限 设置菜单
        // let activeFirstMenuIndex = topMenu.findIndex((item) => item.meta.permissionKey === permissionParent);
        getrouterPath(path);
    } 
}
function getrouterPath(path){
    let {menuMap, topMenu} = store.state.system;
    let activeFirstMenuIndex = null;
    for(let key in menuMap) {
        if(menuMap[key].indexOf(path) > -1) {
            activeFirstMenuIndex = key;
            return ;
        }
    }
    let activeFirstMenu = topMenu[activeFirstMenuIndex];
//    store.dispatch('activeFirstMenu', activeFirstMenu); // 修改侧边栏激活状态
    let {secondMenu, thirdMenu, navList, activeNav} = [{}, {}, [], {}]
    if(activeFirstMenu.children && activeFirstMenu.children.length){
        let activeSecondMenuIndex = activeFirstMenu.children.findIndex((item) => item.path === path);
        if(activeSecondMenuIndex !== -1){
            secondMenu = activeFirstMenu.children[activeSecondMenuIndex];
            navList = activeFirstMenu.children;
            activeNav = secondMenu;
        } else {
            activeFirstMenu.children.map(second => {
                if(second.children) {
                    let activeThirdMenuIndex = second.children.findIndex((item) => item.path === to.path);
                    if(activeThirdMenuIndex !== -1){
                        secondMenu = second;
                        thirdMenu = second.children[activeThirdMenuIndex];
                        navList = secondMenu.children;
                        activeNav = thirdMenu;
                    }
                }
            });
        }
            
    }
    setStore(activeFirstMenu, secondMenu, thirdMenu, navList, activeNav)
}
function setStore(firstMenu, secondMenu, thirdMenu, navList, activeNav){
    store.dispatch('activeFirstMenu', firstMenu);
    store.dispatch('activeSecondMenu', secondMenu); // 修改二级激活菜单
    store.dispatch('activeThirdMenu', thirdMenu); // 修改三级激活菜单
    store.dispatch('navMenu', navList); // 修改横向nav菜单
    store.dispatch('activeNavMenu', activeNav); // 修改nav激活菜单
}
export default vueRouter