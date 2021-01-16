import axios from "axios";
import store from "../store";
import router from "../router";
import { getToken } from "./auth";
import { notification } from "ant-design-vue";

// 创建axios实例
// eslint-disable-next-line
const service = (axios as any).create({
  // baseURL: process.env.BASE_API, // api的base_url
  // baseURL: "http://yangkai.org.cn:8004/", // api的base_url
  // baseURL: "http://58.87.109.240:8080/", // api的base_url
  baseURL: "http://192.168.31.29:8080/", // api的base_url
  timeout: 15000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  (config: { headers: { [x: string]: string | undefined } }) => {
    if (store.getters.token && store.getters.token !== "undefined") {
      config.headers["ACCESS_TOKEN"] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config;
  },
  (error: string) => {
    // Do something with request error
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  (response: { data: { Code: string; Message: string } }) => {
    const res = response.data;
    if (res.Code === "0") {
      notification.error({
        message: "ERROR",
        description: res.Message
      });
      return Promise.reject(response);
    }
    return res;
  },
  (error: { response: { status: number } }) => {
    if (!error.response) {
      notification.error({
        message: "System Error",
        description: Response
      });

      return Promise.reject(error);
    } else if (error.response.status === 500) {
      notification.error({
        message: "System Internal Error",
        description: ""
      });
    } else if (error.response.status === 401) {
      store.dispatch("FedLogOut").then(() => {
        router.push({ path: "/login" });
      });
    } else if (error.response.status === 403) {
      notification.error({
        message: "Permission Denied",
        description: ""
      });
      router.push({ path: "/homepage" });
    }
    return Promise.reject(error);
  }
);

export default service;
