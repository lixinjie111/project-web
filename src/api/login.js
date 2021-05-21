import httpaxios from '@/utils/http'

/**
 * 获取令牌接口
 * @param {*} grant_type 鉴权类型（authorization_code,password,refresh_token,implicit,client_credentials）
 *                       当grant_type为‘password’密码模式时，username和password字段是必填字段。
 * @param {*} username  
 * @param {*} password （密文，AEC加密处理） 
 * @returns 
 */
export function handleGetToken(username, password, grant_type = 'password', scope = 'server'){
  return httpaxios.post('/auth/oauth/token', 
    {grant_type, username, password, scope}, 
    {headers: {'Content-Type': 'application/x-www-form-urlencoded', 'charset': 'UTF-8'}}
  )
}
/**
 * 刷新token
 * @param {*} refresh_token 
 * @param {*} grant_type 
 * @returns 
 */
export function handleRefreshToken (refresh_token, grant_type = 'refresh_token') {
  return httpaxios.post('/auth/oauth/token', 
    {refresh_token, grant_type}, 
    {headers: {'Content-Type': 'application/x-www-form-urlencoded', 'charset': 'UTF-8'}}
  )
}
/**
 * 获取验证码 获取插件验证码
 * @returns 
 */
export function handleGetCode(){
  return httpaxios.post('/code', {})
}
/**
 * 校验验证码
 * @param {*} token 获取验证码接口回传的token
 * @param {*} pointJson aes加密坐标信息
 * @returns 
 */
export function handleCheckCode(token, pointJson) {
  return httpaxios.post('/code/check', {token, pointJson});
}

