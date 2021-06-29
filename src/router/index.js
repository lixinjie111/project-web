// import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './home'
import store from '@/store'
import {isInPermission} from '@/utils/common.js'

const router = {
    mode:'history', // 对应的是 html5 的history API 有状态的路由
    // linkActiveClass:'is-active', // router-link激活的默认样式定义
    routes
}

// 构建VueRouter对象
let vueRouter = new VueRouter(router)
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

// 拦截路由，进行授权判断和缓存限制
vueRouter.beforeEach((to, from, next) => {
    if (!to.meta?.isAuth && to.path !== '/') { // 不需要登录的页面
        // 登录禁止重复登录
        // if(store.state.users.accessToken && to.path.indexOf('/login')){

        // } else{
            next()
        // }
    } else if((to.meta?.isAuth || to.path === '/') && store.state.users.accessToken ){
        setStoreMenu(to, next);
    } else {
        next({ path: '/login', replace: true })
    }
})

// 重置title
vueRouter.afterEach((to) => {
    // reset the page title
    const title = to.meta && to.meta?.title ? to.meta.title : '元知项目协作管理平台';
    document.title = '元知项目协作管理平台';
    // 从路由的元信息中获取 title 属性
    // if (to.meta.title) {
    //     document.title = to.meta.title;
    // }
})

function setStoreMenu(to, next){
    let path = to.path;
    let {permissionKey, entryPath} = to.meta;
    let {menuList, menuMap, topMenu, firstMenu, secondMenu, permission, activeNavMenu} = store.state.system;
    if(!topMenu.length) return; // vuex已经缓存菜单
    // 有些页面不在菜单列表，根据数据操作权限 能进入某些页面
    if(isInPermission(permissionKey) || (!permissionKey && menuList.indexOf(entryPath) > -1)) {
        getrouterPath(entryPath)
        next();
        return ;
    } else if(menuList.indexOf(path) === -1 || path === '/'){
        // 默认地址
        setStore(topMenu[0], topMenu[0].children, {}, topMenu[0].children, topMenu[0].children[0]); // 修改菜单
        next({
            path: topMenu[0].children[0].path,
            replace: true
        })
        return ;
    } else if(menuList.indexOf(path) > -1) { // 有菜单权限 设置菜单
        // let activeFirstMenuIndex = topMenu.findIndex((item) => item.meta.permissionKey === permissionParent);
        getrouterPath(path);
        next();
    } 
}
function getrouterPath(path){
    let {menuMap, topMenu} = store.state.system;
    let activeFirstMenuIndex = null;
    for(let key in menuMap) {
        if(menuMap[key].indexOf(path) > -1) {
            activeFirstMenuIndex = key;
            break ;
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
                    let activeThirdMenuIndex = second.children.findIndex((item) => item.path === path);
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