/*
 * @Author: github.com/yhkl-dev
 * @LastEditors: github.com/yhkl-dev
 * @Date: 2020-10-29 10:42:15
 * @LastEditTime: 2020-10-29 11:18:49
 * @Description: request from backend
 * @FilePath: \dbdms-frontend\src\utils\request.ts
 */
import axios from "axios";
import store from "../store";
import router from "../router";
import { getToken } from "./auth";

import { message } from "ant-design-vue";

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers["Authorization"] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config;
  },
  (error: any) => {
    // Do something with request error
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.errmsg) {
      message.error(res.errmsg);
      return Promise.reject(response);
    }
    return res;
  },
  error => {
    if (!error.response) {
      message.error("系统错误");
      return Promise.reject(error);
    }
    if (error.response.status === 401) {
      store.dispatch("FedLogOut").then(() => {
        router.push({ path: "/login" });
      });
    } else if (error.response.status === 403) {
      message.error("权限拒绝", 1500, function() {
        router.push({ path: "/homepage" });
      });
    } else if (error.response.status === 400) {
      message.error("认证失效，请重新登陆");
    } else if (error.response.status === 500) {
      message.error("服务器内部错误");
    } else {
      message.error(error.response.data.detail);
    }
    return Promise.reject(error);
  }
);

export default service;
