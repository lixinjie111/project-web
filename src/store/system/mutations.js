import menu from '../../utils/menu'
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
  // [types.ACTIVE_HOME_PAGE] (state) {
  //   let menuPath = []
  //   menuPath.push({
  //     name: '首页'
  //   })
  //   state.menuPath = menuPath
    
  //   state.secondMenu = {}
  // },
  [types.INIT_USER_INFO] (state, userInfo) {
    state.userInfo = userInfo
  },
  [types.REMOVE_USER_INFO] (state) {
    state.userInfo = {}
  },
  [types.INIT_PERMISSION] (state, permissionList){
    state.permission = permissionList
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