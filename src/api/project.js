import httpaxios from '@/utils/http'

/**
 * 获取项目列表
 * @param {*} current 当前页码
 * @param {*} size 页数
 * @returns
 */
export function getProjectList(current, size, status) {
    return httpaxios.get('/business/project/page',{
        params: {current, size, status}
    })
}

/**
 * 获取项目列表状态项目数
 */
export function getProjectCount() {
    return httpaxios.get('/business/project/count',{})
}

/**
 * 添加项目
 * @param {*} data表单对象
 * @param {*} beginTime 开始日期
 * @param {*} endTime 截止日期
 * @param {*} masterList 负责人列表
 * @param {*} projectCode 项目代码
 * @param {*} projectDescription 项目描述
 * @param {*} projectName 项目名称
 * @param {*} projectList 关联项目列表
 * @param {*} publicFlag 访问控制
 * @returns
 */
export function addProject(data) {
    return httpaxios.post('/business/project/add', {data})
}

/**
 * 编辑项目
 * @param {*} data表单对象
 * @param {*} id 项目id
 * @param {*} cancelRelIds 已取消关联产品的关联id的List
 * @param {*} beginTime 开始日期
 * @param {*} endTime 截止日期
 * @param {*} masterList 负责人列表
 * @param {*} projectCode 项目代码
 * @param {*} projectDescription 项目描述
 * @param {*} projectName 项目名称
 * @param {*} projectList 关联项目列表
 * @param {*} publicFlag 访问控制
 * @returns
 */
export function editProject(data) {
    return httpaxios.put('/business/project/update', {data})
}

/**
 * 获取项目可绑定的产品列表
 */
export function getBindingProductList() {
    return httpaxios.get('/business/project/queryBinding',{})
}

/**
 * 删除项目
 * @param {*} id
 * @returns
 */
export function delProject(id) {
    return httpaxios.delete(`/business/project/${id}`,{})
}

/**
 * 开始项目
 * @param {*} id 项目id
 * @param {*} remark 备注
 * @returns
 */
export function startProject(id, remark){
    return httpaxios.put('/business/project/start', {data: {id, remark}})
}

/**
 * 搁置项目
 * @param {*} id 项目id
 * @param {*} remark 备注
 * @returns
 */
export function suspendProject(id, remark){
    return httpaxios.put('/business/project/suspend', {data: {id, remark}})
}

/**
 * 完成项目
 * @param {*} id 项目id
 * @param {*} remark 备注
 * @returns
 */
export function closeProject(id, remark){
    return httpaxios.put('/business/project/close', {data: {id, remark}})
}

/**
 * 获取项目详情
 * @param {*} id 项目id
 * @returns
 */
export function getProjectDetail(id) {
    return httpaxios.get(`/business/project/${id}`, {})
}

/**
 * 导出产品信息
 * @param {*} status 状态
 * @returns
 */
export function exportProject(status) {
    return httpaxios.get('/business/export/project', {
        params: {status},
        responseType: 'blob'
    })
}