import httpaxios from '@/utils/http'

/**
 * 获取我的项目列表
 * @param {*} current 当前页码
 * @param {*} size 页数
 * @returns
 */
export function getMineProjectList(current, size) {
    return httpaxios.get('/business/project/myPage',{
        params: {current, size}
    })
}
