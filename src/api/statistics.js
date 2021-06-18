import httpaxios from '@/utils/http'
/**
 * 查询人员列表
 * @param {*} data 
 * @returns 
 */
export function handleGetUserTask(data){
  return httpaxios.post('/business/summary/userTask', {data})
}
/**
 * 人员导出
 * @param {*} data 
 * {
 *    "deptId": 221,
 *    "endDate": "2020/04/01",
 *    "startDate": "2020/04/01"
 * }
 * @returns 
 */
export function handleExportStaff(data){
  return httpaxios.post('/business/export/statistics', {
    data,
    responseType: 'blob'
  })
}