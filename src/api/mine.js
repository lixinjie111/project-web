import httpaxios from '@/utils/http'

/**
 * 获取我的项目列表
 * @param {*} current 当前页码
 * @param {*} size 页数
 * @returns
 */
export function getMyProjectList(current, size) {
    return httpaxios.get('/business/project/myPage',{
        params: {current, size}
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
 * 获取我的重点项目列表
 * @returns
 */
export function getMyKeyProjectList() {
    return httpaxios.get('/business/projectVipWeek/list/my',{})
}

/**
 * 修改用户密码
 * @param {*} form
 * @returns
 */
export function handlePutPassWord(form){
    return httpaxios.put('/admin/user/edit/password', {data: form})
}


/**
 * 获取我的任务列表
 * @param {*} current 当前页码
 * @param {*} size 页数
 * @returns
 */
export function getMyTaskList(current, size) {
    return httpaxios.get('/business/task/myPage', {
        params: {current, size}
    })
}
