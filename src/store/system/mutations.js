import * as types from './mutation-types'

export default {
  [types.INIT_TOP_MENU] (state, menu) {
    state.topMenu = menu
    state.menuList = toMenuListByTree(menu)
    console.log(state.menuList)
    state.menuMap = toMenuMapByLevel(menu)
  },
  [types.ACTIVE_FIRST_MENU] (state, menu) {
    state.firstMenu = menu
  },
  [types.ACTIVE_SECOND_MENU] (state, menu) {
    state.secondMenu = menu
  },
  [types.ACTIVE_THIRD_MENU] (state, menu) {
    state.thirdMenu = menu
  },
  [types.NAV_MENU] (state, menu) {
    state.navMenu = menu
  },
  [types.ACTIVE_NAV_MENU](state, menu) {
    state.activeNavMenu = menu
  },
  [types.INIT_PERMISSION] (state, permissionList){
    state.permission = permissionList
  },
  [types.REMOVE_MENU_DATA] (state){
    state.menuMap = {}; // 所有的菜单Map，键值为层级 level-1,
    state.menuList = []; // 所有菜单列表
    state.topMenu = []; // 顶级节点
    state.firstMenu = {}; // 当前的一级菜单 --- 当前激活侧边栏
    state.secondMenu = {}; // 当前的二级菜单 --- 横向算是二级菜单或三级菜单
    state.thirdMenu = {}; // 当前的三级菜单
    state.navMenu = []; // 当前横向菜单 --- 横向菜单
    state.activeNavMenu = {}; // 横向激活菜单
  },
  [types.REMOVE_PERMISSION](state) {
    state.permission = [];
  }
}

function toMenuListByTree (topMenu) {
  let menuList = [];
  getListRecursion(menuList, topMenu)
  return menuList;
}

// 遍历所有有权限路由
function getListRecursion (menuList, parentMenu) {
  if(Array.isArray(parentMenu)){
     for (let itemMenu of parentMenu) {
      menuList.push(itemMenu.path);
      if (itemMenu.children) {
        getListRecursion(menuList, itemMenu.children)
      }
     }
  } else {
    menuList.push(parentMenu.path);
  }
}

function toMenuMapByLevel (topMenu) {
  let  menuMap = {};
  if(Array.isArray(topMenu)){
    topMenu.map((item, index)=> {
      menuMap[index] = [],
      getMapMenu(menuMap[index], item)
    })
  };
  return menuMap;
}
// 遍历单个子树路由 menuMap
function getMapMenu(list, parentMenu) {
  list.push(parentMenu.path);
  if(parentMenu.children && Array.isArray(parentMenu.children)){
    for (let itemMenu of parentMenu.children) {
      getMapMenu(list, itemMenu)
    }
  }
}

// function getBtnPermission (firstMenu){
//   let permissionArr = [];
//   let getPermission = function(menu){
//     if(menu){
//       if(menu.permission){
//         permissionArr.push(menu.permission)
//       }
//       if(menu.childList){
//         menu.childList.forEach(item=>{
//           getPermission(item)
//         })
//       }else{
//         return false;
//       }
//     }
//   }
//   getPermission(firstMenu);
//   return permissionArr;
// }