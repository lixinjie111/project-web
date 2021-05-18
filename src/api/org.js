import httpaxios from '@/utils/http'

/**
 * 组织-部门树
 * @returns 
 */
export function getDeptTree(){
  return httpaxios.get('/admin/dept/tree', {})
}
/**
 * 组织-角色 角色列表
 * @param {*} current 页码
 * @param {*} size 页面条数pageSize
 * @returns 
 */
export function getRoleList(current, size) {
  return httpaxios.get('/admin/role/page', {current, size})
}
/**
 * 组织-角色 编辑[put] 新增[post]角色
 * @param {*} roleName 
 * @param {*} roleId [put]需要角色id
 * @returns 
 */
export function handlePostPutRoleInfo(roleName, roleId){
  return roleId ? httpaxios.put('/admin/role', {roleName, roleId}) : httpaxios.post('/admin/role', {roleName})
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
  return httpaxios.put('/admin/role/menu', {roleId, menuIds})
}
/**
 * 角色-操作权限-列表
 * @param {*} parentId 父节点id
 * @param {*} lazy 是否懒加载
 * @returns 
 */
export function handleGetMenuTree(parentId, lazy){
  return httpaxios.get('/admin/menu/tree', {lazy, parentId})
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
  return httpaxios.post('/admin/user/batchModifyUserRole', {roleId, joins, unJoins})
}