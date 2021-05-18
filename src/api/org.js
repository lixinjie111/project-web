import httpaxios from '@/utils/http'
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

