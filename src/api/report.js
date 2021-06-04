import httpaxios from '@/utils/http'

/**
 * 查询工作进度列表
 * @param {*} deptId 部门id
 * @returns 
 */
export function handleGetWeekList(deptId) {
  return httpaxios.get(`/business/projectWeek/list/${deptId}`)
}
/**
 * 查询月度计划列表
 * @param {*} deptId 部门id
 * @returns 
 */
export function handleGetMonthList(deptId) {
  return httpaxios.get(`/business/projectMonth/list/${deptId}`)
}
/**
 * 修改月度计划状态
 * @param {*} id 
 * @param {*} status 状态id
 * @returns 
 */
export function handlePutMonthStatus(id, status){
  return httpaxios.put('/business/projectMonth/status',{
    data: {id, status}
  })
}
/**
 * 查询月度交付物列表
 * @param {*} deptId 
 * @returns 
 */
export function handleGetDeliverableList(deptId){
  return httpaxios.get(`/business/projectDeliverable/list/${deptId}`)
}