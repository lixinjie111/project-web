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
 * 修改工作进度信息
 * @param {*} data 
 * {
 *    "description": "工作进展描述",
 *    "id": 1,
 *    "nextWeekWork": "下周工作计划",
 *    "remark": "备注" 
 * }
 * @returns 
 */
export function handlePutProjectWeek(data) {
  return httpaxios.put('/business/projectWeek', {data})
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
 * 修改月度计划信息
 * @param {*} data 
 * {
 *    "acceptanceCriteria": "验收标准",
 *    "deliverable": "月度交付物",
 *    "description": "月度计划描述",
 *    "id": 1,
 *    "remark": "备注"
}
 * }
 * @returns 
 */
export function handlePutProjectMonth(data) {
  return httpaxios.put('/business/projectMonth', {data})
}
/**
 * 查询月度交付物列表
 * @param {*} deptId 
 * @returns 
 */
export function handleGetDeliverableList(deptId){
  return httpaxios.get(`/business/projectDeliverable/list/${deptId}`)
}
/**
 * 修改月度交付物状态
 * @param {*} id 
 * @param {*} status 
 * @returns 
 */
export function handlePutDeliverableStatus(id, status) {
  return httpaxios.put('/business/projectDeliverable/status', {
    data: {id, status}
  })
}
/**
 * 修改月度交付物信息
 * @param {*} data 
 * {
 *    "acceptance": "验收情况",
 *    "id": 1,
 *    "remark": "交付物备注"
 * }
 * @returns 
 */
export function handlePutProjectDeliverable(data){
  return httpaxios.put('/business/projectDeliverable', {data})
}


/**
 * 获取重点项目列表
 */
export function getKeyProjectList() {
  return httpaxios.get('/business/projectVipWeek/list',{})
}


/**
 * 修改重点项目信息
 * @param {*} data
 * {
 *    "id": 1,
 *    "remark": "备注"
 * }
 * @returns
 */
export function editKeyProject(data){
  return httpaxios.put('/business/projectVipWeek', {data})
}
