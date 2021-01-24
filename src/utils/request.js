import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

import router from '../router'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 15000
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['ACCESS_TOKEN'] = getToken()
  }
  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(response => {
  const res = response.data
  if (res.errmsg) {
    Message.error(res.errmsg)
    return Promise.reject(response)
  }
  return res
}, error => {
  if (!error.response) {
    Message.error('SYSTEM ERROR')
    return Promise.reject(error)
  }
  if (error.response.status === 401) {
    store.dispatch('FedLogOut').then(() => {
      router.push({ path: '/login' })
    })
  } else if (error.response.status === 403) {
    Message({
      message: 'PERMISSION DENIED',
      type: 'error',
      duration: 1500,
      onClose: function () {
        router.push({ path: '/dashboard' })
      }
    })
  } else if (error.response.status === 400) {
    Message({
      type: 'error',
      message: 'AUTHENTICATION FAILED, PLEASE LOGIN'
    })
  } else if (error.response.status === 500) {
    Message({
      type: 'error',
      message: 'SERVER INTERVAL ERROR'
    })
  } else {
    Message({
      type: 'error',
      message: error.response.data.detail
    })
  }
  return Promise.reject(error)
}
)

export default service
