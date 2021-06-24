import httpaxios from '@/utils/http'

/**
 * 获取我的重点项目列表
 * @returns
 */
export function getMyKeyProjectList() {
    return httpaxios.get('/business/projectVipWeek/list/my',{})
}

/**
 * 统计我的项目各个类型下的项目个数
 * @returns
 */
export function getMyProjectCount() {
    return httpaxios.get('/business/project/myProject/count',{})
}

/**
 * 获取我的项目列表
 * @param {*} current 当前页码
 * @param {*} size 页数
 * @param {*} kind 种类
 * @returns
 */
export function getMyProjectList(current, size, kind) {
    return httpaxios.get('/business/project/myPage',{
        params: {current, size, kind}
    })
}

/**
 * 统计我的各个类型任务
 * @returns
 */
export function getMyTaskCount() {
    return httpaxios.get('/business/task/myTask/count',{})
}

/**
 * 获取我的任务列表
 * @param {*} current 当前页码
 * @param {*} size 页数
 * @param {*} kind 种类
 * @returns
 */
export function getMyTaskList(current, size, kind) {
    return httpaxios.get('/business/task/myPage', {
        params: {current, size, kind}
    })
}

/**
 * 获取我的动态列表
 * @param {*} current 当前页码
 * @param {*} size 页数
 * @returns
 */
export function getMyDynamicStates(current, size) {
    return httpaxios.get('/business/project/my/dynamicStates', {
        params: {current, size}
    })
}

/**
 * 修改用户密码
 * @param {*} form
 * @returns
 */
export function handlePutPassWord(form){
    return httpaxios.put('/admin/user/edit/password', {data: form})
}

