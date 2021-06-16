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
 * 查询设置
 * @returns
 */
export function handleGetSetList(){
  return httpaxios.get('/business/jobProject/list', {})
}
/**
 * 修改常规周报设置
 * @param {*} data
 * {
 *    "hour": 10,
 *    "id": 1,
 *    "minute": 10,
 *    "week": "MON"
 *  }
 * @returns
 */
export function handlePostRegular(data) {
  return httpaxios.post('/business/jobProject/addWeek', {data})
}
/**
 * 新增及修改自定义时间
 * @param {*} data
 * {
 *    "dateTime": "2021-03-02 01:00:00",
 *    "id": 1
 * }
 * @returns
 */
export function handlePostTime(data) {
  return httpaxios.post('/business/jobProject/addTime', {data})
}
/**
 * 删除自定义设置
 * @param {*} jobId 设置id
 * @returns
 */
export function handleDelSetTime(jobId){
  return httpaxios.delete(`/business/jobProject/${jobId}`)
}
/**
 * 已归档列表
 * @param {*} params
 * current 当前页码
 * size 每页展示数量
 * beginTime
 * endTime
 * @returns
 */
export function handleGetArchiveList(params){
  return httpaxios.get('/business/archive/page', {params})
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

/**
 * 获取项目设置列表
 * @returns 
 */
export function handleGetVipWeekList(){
  return httpaxios.get('/business/projectVipWeek/getAll')
}

/**
 * 设置重点项目
 * @param {*} data 
 * @returns 
 */
export function handlePostVipWeek(data) {
  return httpaxios.post('/business/projectVipWeek', {data: {list: data}})
}
