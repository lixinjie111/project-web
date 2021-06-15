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
 * 修改用户密码
 * @param {*} form 
 * @returns 
 */
export function handlePutPassWord(form){
    return httpaxios.put('/admin/user/edit/password', {data: form})
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
