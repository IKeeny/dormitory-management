/**
 * axios的二次封装，统一捕获异常接口，鉴权，重定向，消息提示功能
 */
 import axios from 'axios'
 import {
     Message,
     Loading
 } from 'element-ui'
 
 let loading = null
 let timer = null
 const messageTime = 1600
 const domain = window.location.host.split('.').slice(1).join('.')
 
 
 // 使用Element loading-start 方法
 function startLoading() {
     loading = Loading.service({
         lock: false,
         text: '加载中',
         background: 'rgba(0, 0, 0, 0)'
     })
 }
 
 // 使用Element loading-close 方法
 function endLoading() {
     loading.close()
 }
 
 // 确保将同一时刻的请求合并
 let needLoadingRequestCount = 0
 
 // 展示加载效果
 export function showFullScreenLoading() {
     if (needLoadingRequestCount === 0) {
         timer = setTimeout(() => {
             startLoading()
             clearTimeout(timer)
         }, 1500)
     }
     needLoadingRequestCount++
 }
 
 // 关闭加载效果
 export function tryHideFullScreenLoading() {
     if (needLoadingRequestCount <= 0) return
     needLoadingRequestCount--
     if (needLoadingRequestCount === 0) {
         timer && clearTimeout(timer)
         loading && endLoading()
     }
 }
 
// 创建axios实例
const http = axios.create({
    baseURL: 'http://localhost:3000',
    //  baseURL: process.env.VUE_APP_BASE_URL,
     timeout: 10000,
     responseType: 'json',
     withCredentials: true, // 是否允许带cookie这些
     headers: {
         'Content-type': 'application/json;charset=UTF-8'
     },
     retry: 4,
     retryDelay: 1000
})

// respone拦截器
//  http.interceptors.response.use(
//      res => {
//          // code为非200是抛错
//          if (res.status !== 200) {
//              Message({
//                  message: res.statusText,
//                  type: 'error',
//                  duration: messageTime
//              })
//              tryHideFullScreenLoading()
//              return Promise.reject(res.message)
//          } else {
//              // token失效返回code，后台还在开发中
//              tryHideFullScreenLoading()
//              const data = res.data
//              if (data && data.code === '200') {
//                  data.code = 200
//              }
//              return data
//          }
//      },
//      error => {
//          let errorStr = error + ''
//          if (errorStr.search('timeout') !== -1 && utils.is.isEmpty(error.response)) {
//              // 超时处理
//              let config = error.config
//              let url = config.url.replace(baseUrl, '')
//              config.__retryCount = config.__retryCount || 0
//              if (config.__retryCount >= config.retry) {
//                  tryHideFullScreenLoading()
//                  return Promise.reject(error)
//              }
//              config.__retryCount += 1
//              let backoff = new Promise(function (resolve) {
//                  setTimeout(function () {
//                      resolve()
//                  }, config.retryDelay || 1)
//              })
//              tryHideFullScreenLoading()
//              return backoff.then(function () {
//                  config.url = url
//                  return http(config)
//              })
//          } else {
//              if (error.response && !utils.is.isEmpty(error.response.status)) {
//                  if (error.response.status === 401) {
//                      const domain = window.location.host
//                          .split('.')
//                          .slice(1)
//                          .join('.')
//                      setLocalCookieDomain(userTokenStorageKey, '', domain)
//                      store.commit('SET_XW_CLOUD_USER_NAME', '')
//                      localStorage.clear()
//                      router.push('/login')
//                  }
//                  console.log(error.response)
//                  // 400,500异常处理，统一提示错误消息
//                  if (error.response.status === 500 || error.response.status === 400) {
//                      Message({
//                          message: error.response.data.message || '服务器异常，请联系管理员',
//                          type: 'error',
//                          duration: messageTime
//                      })
//                  }
//                  if (error.response.status === 404) {
//                      router.push({
//                          path: '/error/404'
//                      })
//                  }
//                  if (error.response.status === 403) {
//                      // router.push({
//                      //     path: '/error/403'
//                      // })
//                      Message({
//                          message: '没有权限！',
//                          type: 'error'
//                      });
//                  }
//              }
//              // let errorInfo = error.message ? error.message : error.data
//              tryHideFullScreenLoading()
//              // return Promise.reject(errorInfo)
//              return Promise.reject(error.response)
//          }
//      }
//  )
 export default http
 