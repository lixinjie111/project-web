import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { getToken } from '../utils/auth.js'
import router from '../router/index'

Vue.use(VueAxios, axios)
const httpaxios = {
	instance: null,
	//Initialization axios instance
	init: function () {
		if (this.instance) return
		//setting time-out
		const instance = axios.create({
			timeout: 30000,
			withCredentials: true
		})
		let pending = []; //声明一个数组用于存储每个请求的取消函数和axios标识
		let cancelToken = axios.CancelToken;
		let removePending = (config) => {
				for(let p in pending){
						if(pending[p].u === config.url + JSON.stringify(config.data) + '&' + config.method) { //当当前请求在数组中存在时执行函数体
								pending[p].f(); //执行取消操作
								pending.splice(p, 1); 
						}
				}
		}

		//Add request interceptor
		instance.interceptors.request.use(
			config => {
				removePending(config); //在一个axios发送前执行一下取消操作
				config.cancelToken = new cancelToken((c)=>{
						// 这里的axios标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
						pending.push({ u: config.url + '&' + config.method, f: c });  
				});
				try {
					const token = getToken()
					config.headers['x-token'] = token
					return config
				} catch (err) {
					return Promise.reject(err)
				}
			}, error => {
				return Promise.reject(error)
			})
		// response's interceptors，Error handling here，And return data for ease of use
		instance.interceptors.response.use(
			response => {
				removePending(response.config);  //在一个axios响应后再执行一下取消操作，把已经完成的请求从pending中移除
    
				//set data
				const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data
				
				if (data.code == 401) { // Logon Failure || Unlogged
					router.push({
						path: '/login'
					})
					return
				}
				if (data.code == 998) { //elligal login
					router.push({
						path: '/login'
					})
					return
				}
				if (data.code == 500) { //Server error
					router.push({
						path: '/error500'
					})
				} else {
					return data
				}
				if (data.code == 200) { //normal
					// set response new token to know if open the page for 30mins and close it .
					return data
				}
				
			}, function (error) {
				if (error instanceof axios.Cancel) {
					error.isCanceled = true
				} else {
					error.isCanceled = false
				}
				//this.$Toast("网络连接失败,请检查网络")
				return Promise.reject(error)
			})
		this.instance = instance
	},
	get: function (apiName, opts) {
		if (opts && typeof opts === 'object') {
			opts = { params: opts }
		}
		return httpaxios.request(apiName, opts, 'get')
	},
	post: function (apiName, opts, config) {
		if (opts && typeof opts === 'object') {
			opts = { data: opts, ...config }
		}
		return httpaxios.request(apiName, opts, 'post')
	},
	put: function (apiName, opts) {
		if (opts && typeof opts === 'object') {
			opts = { data: opts }
		}
		return httpaxios.request(apiName, opts, 'put')
	},
	delete: function (apiName, opts) {
		if (opts && typeof opts === 'object') {
			opts = { data: opts }
		}
		return httpaxios.request(apiName, opts, 'delete')
	},
	request: function (apiName, opts, method) {
    this.init()
    if (typeof apiName === 'object') {
      opts = apiName
      apiName = opts.apiName
    } else if (typeof apiName === 'string') {
      if (typeof opts === 'object') {
				opts = { data: opts.data, params: opts.params, ...opts.config }
      } else {
        opts = {data: {}, params: {}}
      }
    } else {
      throw new Error('hxaios的参数不正确')
    }
    if (!apiName) {
      throw new Error('apiName is not defined!')
    }
		const {data, params, ...rest} = opts
    return this.instance.request({
      url: apiName,
      baseURL: process.env.API_HOST,
			data: data instanceof FormData ? data : JSON.stringify(data),
      method:method,
      headers: {'Content-Type': 'application/json', 'charset': 'UTF-8'},
      params,
      ...rest
    })
  }
}
export default {
  get: httpaxios.get,
  post: httpaxios.post,
  put: httpaxios.put,
  delete: httpaxios.delete,
}