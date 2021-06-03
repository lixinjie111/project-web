import httpaxios from '@/utils/http'
import http from '../utils/http'

/**
 * 获取用户菜单
 * @param {*} parentId 
 * @returns 
 */
export function handleGetUserMenu (parentId) {
  return httpaxios.get('/admin/menu',{
    params: {parentId},
  })
}
/**
 * 组织-部门树
 * @returns 
 */
export function getDeptTree(){
  return httpaxios.get('/admin/dept/tree', {})
}

/**
 * 获取人员列表
 * @param {*} deptId 部门id
 * @param {*} current 当前页码
 * @param {*} size 页面尺寸
 * @returns 
 */
export function getAdminUserList(deptId, current, size){
  return httpaxios.get('/admin/user/page', {
    params: {deptId, current, size}
  })
}
/**
 * 锁定用户
 * @param {*} userId 待锁定用户id
 * @param {*} lockFlag 待修改状态
 * @returns 
 */
export function handlePutLockUser(userId, lockFlag) {
  return httpaxios.put(`/admin/user/lockUser/${userId}/${lockFlag}`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
/**
 * 修改用户信息 [put方法 修改用户] []
 * @param {*} username 用户名
 * @param {*} realName 真实姓名
 * @param {*} deptId 部门id
 * @param {*} role 角色列表
 * @param {*} phone 电话
 * @param {*} position 职位
 * @param {*} gender 性别
 * @returns 
 */
export function handlePostPutAdminUser(userId, username, realName, deptId, role, phone, position, gender) {
  let data = userId ? {userId, username, realName, deptId, role, phone, position, gender} : {username, realName, deptId, role, phone, position, gender};
  return httpaxios[userId ? 'put' : 'post']('/admin/user', {data})
}
/**
 * 指定用户重置密码
 * @param {*} userId 
 * @returns 
 */
 export function handleResetPassWord(userId) {
  return httpaxios.put(`/admin/user/resetPassword/${userId}`,{
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
}
/**
 * 删除用户
 * @param {*} userId 
 * @returns 
 */
export function handleDelAdminUser(userId) {
  return httpaxios.delete(`/admin/user/${userId}`,{})
}
/**
 * 获取角色列表 不分页
 * @returns 
 */
export function getAdminRoleList (){
  return httpaxios.get('/admin/role/list')
}
/**
 * 创建部门
 * @param {*} data 列表（包括编辑 新增）
 * @returns 
 */
export function handlePostAdminDept(data){
  return httpaxios.post('/admin/dept/batchUpdate', {data})
}
/**
 * 删除部门
 * @param {*} deptId 部门id
 * @returns 
 */
export function handleDeleteAdminDept(deptId) {
  return httpaxios.delete(`/admin/dept/${deptId}`)
}

/**
 * 组织-角色 角色列表 分页
 * @param {*} current 页码
 * @param {*} size 页面条数pageSize
 * @returns 
 */
export function getRoleList(current, size) {
  return httpaxios.get('/admin/role/page', {
    params: {current, size}
  })
}
/**
 * 组织-角色 编辑[put] 新增[post]角色
 * @param {*} roleName 
 * @param {*} roleId [put]需要角色id
 * @returns 
 */
export function handlePostPutRoleInfo(roleName, roleId){
  let data = roleId ? {roleName, roleId} : {roleName};
  return httpaxios[roleId ? 'put' : 'post']('/admin/role', {data})
}
/**
 * 组织-角色 删除角色
 * @param {*} roleId 
 * @returns 
 */
export function handleDelRole(roleId) {
  return httpaxios.delete(`/admin/role/${roleId}`, {})
}
/**
 * 角色-操作权限-保存
 * @param {*} roleId 角色id
 * @param {*} menuIds 菜单id
 * @returns 
 */
export function handlePutRoleMenu(roleId, menuIds){
  return httpaxios.put('/admin/role/menu', {data: {roleId, menuIds}})
}
/**
 * 角色-操作权限-完整树
 * @param {*} parentId 父节点id
 * @param {*} lazy 是否懒加载
 * @returns 
 */
export function handleGetMenuTree(parentId, lazy = false){
  return httpaxios.get('/admin/menu/tree', {params: {lazy, parentId}})
}
/**
 * 获取角色配置操作权限（及菜单）已勾选配置
 * @param {*} roleId 
 * @returns 
 */
export function handleGetRoleMenuTree(roleId){
  return httpaxios.get(`/admin/menu/tree/${roleId}`, {})
}
/**
 * 组织-分组成员管理 根据部门id 查询用户列表
 * @param {*} roleId 
 * @param {*} deptId 
 * @returns 
 */
export function handleGetDeptRoleList(roleId, deptId){
  return httpaxios.get(`/admin/user/role/${roleId}/${deptId}`, {})
}
/**
 * 组织-分组成员管理 保存修改角色
 * @param {*} roleId 角色Id
 * @param {*} joins 新加入用户Id集合
 * @param {*} unJoins 取消加入用户Id集合
 * @returns 
 */
export function handlePostModifyUserRole(roleId, joins, unJoins) {
  return httpaxios.post('/admin/user/batchModifyUserRole', {data: {roleId, joins, unJoins}})
}
/**
 * 
 * @returns 查询用户全部信息
 */
export function handleGetAdminUserInfo(){
  return httpaxios.get('/admin/user/info', {})
}