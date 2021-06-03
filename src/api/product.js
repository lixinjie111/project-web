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
 * @param {*} masterList 负责人列表
 * @param {*} productCode 产品代码
 * @param {*} productDescription 产品描述
 * @param {*} productName 产品名称
 * @param {*} projectList 关联项目列表
 * @param {*} publicFlag 访问控制
 * @returns
 */
export function addProduct(data) {
    return httpaxios.post('/business/product/add', {data})
}

/**
 * 获取产品列表
 * @param {*} data表单对象
 * @param {*} id 产品id
 * @param {*} cancelRelIds 已取消关联项目的关联id的List
 * @param {*} masterList 负责人列表
 * @param {*} productCode 产品代码
 * @param {*} productDescription 产品描述
 * @param {*} productName 产品名称
 * @param {*} projectList 关联项目列表
 * @param {*} publicFlag 访问控制
 * @returns
 */
export function editProduct(data) {
    return httpaxios.put('/business/product', {data})
}

/**
 * 获取产品可绑定的项目列表
 */
export function getBindingProjectList() {
    return httpaxios.get('/business/product/queryBinding',{})
}

/**
 * 删除产品
 * @param {*} id
 * @returns
 */
export function delProduct(id) {
    return httpaxios.delete(`/business/product/${id}`,{})
}

/**
 * 关闭产品
 * @param {*} id 产品id
 * @param {*} remark 备注
 * @returns
 */
export function closeProduct(id, remark){
    return httpaxios.put('/business/product/close', {data: {id, remark}})
}

/**
 * 获取产品详情
 * @param {*} id 产品id
 * @returns
 */
export function getProductDetail(id) {
    return httpaxios.get(`/business/product/${id}`, {})
}