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
 * 获取我的项目列表
 * @param {*} current 当前页码
 * @param {*} size 页数
 * @returns
 */
export function getMyDynamicStates(current, size) {
    return httpaxios.get('/business/project/my/dynamicStates', {
        params: {current, size}
    })
}
