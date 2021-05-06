import * as types from './mutation-types'

export default {
  [types.INIT_TOP_MENU] (state, menu) {
    state.topMenu = menu
    // state.menuMap.level1 = menu; // 单独处理一级菜单 
    state.menuMap = toMenuMapByLevel(menu)
    sessionStorage.setItem('menuMap',JSON.stringify(state.menuMap))
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
  [types.INIT_PERMISSION] (state, firstMenu){
    state.permission = getBtnPermission(firstMenu)
  }
}

function toMenuMapByLevel (topMenu) {
  let menuMap = {}
  getMapRecursion(menuMap, topMenu)
  console.log(menuMap)
  return menuMap
}

function getMapRecursion (menuMap, parentMenu) {
  if(Array.isArray(parentMenu)){
     for (let itemMenu of parentMenu) {
       let key = `level-${itemMenu.level}`;
      Array.isArray(menuMap[key]) ? menuMap[key].push(itemMenu) : menuMap[key] = [itemMenu]
      if (itemMenu.children) {
        getMapRecursion(menuMap, itemMenu.children)
      }
     }
  } else {
    menuMap[`level-${parentMenu.level}`] = parentMenu
  }
}

function getBtnPermission (firstMenu){
  let permissionArr = [];
  let getPermission = function(menu){
    if(menu){
      if(menu.permission){
        permissionArr.push(menu.permission)
      }
      if(menu.childList){
        menu.childList.forEach(item=>{
          getPermission(item)
        })
      }else{
        return false;
      }
    }
  }
  getPermission(firstMenu);
  return permissionArr;
}