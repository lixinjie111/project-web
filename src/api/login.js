import httpaxios from '@/utils/http'
import qs from 'qs'
/**
 * 获取令牌接口
 * @param {*} grant_type 鉴权类型（authorization_code,password,refresh_token,implicit,client_credentials）
 *                       当grant_type为‘password’密码模式时，username和password字段是必填字段。
 * @param {*} username  
 * @param {*} password （密文，AEC加密处理） 
 * @returns 
 */
export function handleGetToken(username, password, grant_type = 'password', scope = 'server'){
  let auth = btoa(`${process.env.VUE_APP_CLIENT_KEY}:${process.env.VUE_APP_CLIENT_KEY}`); // Header是一个"Basic"，加一个空格，再加上"clientId:clientSecret"的base64编码
  return httpaxios.post(`/auth/oauth/token?grant_type=${grant_type}&scope=${scope}`, 
    {
      data: qs.stringify({username, password}),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${auth}`
      }
    }
  )
}
/**
 * 刷新token
 * @param {*} refresh_token 
 * @param {*} grant_type 
 * @returns 
 */
export function handleRefreshToken (refresh_token, grant_type = 'refresh_token') {
  let auth = btoa(`${process.env.VUE_APP_CLIENT_KEY}:${process.env.VUE_APP_CLIENT_KEY}`); // Header是一个"Basic"，加一个空格，再加上"clientId:clientSecret"的base64编码
  return httpaxios.post('/auth/oauth/token', 
    {
      params: {refresh_token, grant_type},
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${auth}`
      }
    }
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
export function handleCheckCode(token, pointJson, captchaType) {
  return httpaxios.post(`/code/check?captchaType=${captchaType}&token=${token}&pointJson=${pointJson}`, 
    {
      headers: {'Content-Type': 'application/x-www-form-urlencoded', 'charset': 'UTF-8'}
    }
  );
}
/**
 * 用户退出登录
 * @returns 
 */
export function handleLogout(){
  return httpaxios.delete('/auth/token/logout', {})
}
