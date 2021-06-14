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
 * 通过id查询团队成员信息
 * @param {*} projectId 项目ID
 * @returns {*}
 */
export function getProjectMemberList(projectId) {
  return httpaxios.get('/business/member/page', {
    params: {
      projectId,
      current: 1,
      size: 1000,
    }
  })
}

/**
 * 通过id查询看板信息
 * @param projectId
 * @returns {*}
 */
export function getProjectBoard(projectId) {
  return httpaxios.get('/business/task/kanban/' + projectId)
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

/**
 * 通过id查询
 * @param taskId
 * @returns {*}
 */
export function getTaskDetail(taskId) {
  return httpaxios.get('/business/task/' + taskId)
}

/**
 * 通过id删除任务表
 * @param taskId
 * @returns {*}
 */
export function deleteTask(taskId) {
  return httpaxios.delete('/business/task/' + taskId)
}

/**
 * 修改任务
 * @param data
 * @returns {*}
 */
export function saveTask(data) {
  return httpaxios.put('/business/task', {data})
}

/**
 * 新增子任务
 * @param projectId
 * @param fatherTaskId
 * @param taskName
 * @returns {*}
 */
export function createChildTask(projectId, fatherTaskId, taskName) {
  return httpaxios.post('/business/task/add/child', {data: {fatherTaskId, projectId, taskName}})
}

/**
 * 看板拖拉修改任务状态
 * @param id
 * @param status
 * @returns {*}
 */
export function changeTaskStatus(id, status) {
  return httpaxios.put(`/business/task/changeStatus/${id}/${status}`)
}

export function addProjectMember(projectId, arr) {
  arr.forEach(item => item.projectId = projectId);

  return httpaxios.post('/business/member', {
    data: arr
  })
}

export function getMyProjectList() {
  return httpaxios.get('/business/project/myPage', {
    params: {
      current: 1,
      size: 1000,
    }
  })
}

/**
 * 通过id删除附件
 * @param id
 * @returns {*}
 */
export function deleteAttachment(id) {
  return httpaxios.delete('/business/attachment/' + id)
}
