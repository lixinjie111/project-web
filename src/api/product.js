import httpaxios from '@/utils/http'

/**
 * 获取产品列表
 * @param {*} current 当前页码
 * @param {*} size 页数
 * @returns
 */
export function getProductList(current, size, status) {
    return httpaxios.get('/business/product/page',{
        params: {current, size, status}
    })
}

/**
 * 获取产品列表状态产品数
 */
export function getProductCount() {
    return httpaxios.get('/business/product/count',{})
}

/**
 * 获取产品列表
 * @param {*} data表单对象
 * @returns
 */
export function addProduct(data) {
    return httpaxios.post('/business/product/add', {data})
}