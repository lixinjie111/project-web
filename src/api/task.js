import httpaxios from '@/utils/http'

/**
 * 获取任务列表
 * @param {*} current 当前页码
 * @param {*} size 页数
 * @param {*} projectId 项目ID
 * @param {*} myTaskFlag 指派给我
 * @param {*} weeklyShow 在周报中显示
 * @returns
 */
export function getTaskList(current, size, projectId, myTaskFlag=false, weeklyShow=false) {
  return httpaxios.get('/business/task/page',{
    params: {current, size, projectId, myTaskFlag, weeklyShow}
  })
}

/**
 * 新建任务
 * @param data
 * @returns {*}
 */
export function createTask(data) {
  return httpaxios.post('/business/task/add', {
    data
  });
}
