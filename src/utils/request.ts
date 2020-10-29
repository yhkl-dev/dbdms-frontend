import axios from "axios";
import store from "../store";
// import router from "../router";
import { getToken } from "./auth";
import {message, notification} from "ant-design-vue";

// import { message } from "ant-design-vue";

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  baseURL: "http://localhost:8080/", // api的base_url
  timeout: 15000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers["ACCESS_TOKEN"] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config;
  },
  (error: any) => {
    // Do something with request error
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.Message) {
      notification.warning({
          message: "ERROR",
          description: res.Message
      });
      return Promise.reject(response);
    }
    return res;
  },
  error => {
    if (!error.response) {
      notification.error({
        message: "System Error",
        description: ""
      });
      return Promise.reject(error);
    } else if (error.response.status === 500) {
      notification.error({
        message: "System Internal Error",
        description: ""
      });
    }
  }

  //   if (error.response.status === 401) {
  //     store.dispatch("FedLogOut").then(() => {
  //       router.push({ path: "/login" });
  //     });
  //   } else if (error.response.status === 403) {
  //     message.error("权限拒绝", 1500, function() {
  //       router.push({ path: "/homepage" });
  //     });
  //   } else if (error.response.status === 400) {
  //     message.error("认证失效，请重新登陆");
  //   } else if (error.response.status === 500) {
  //     message.error("服务器内部错误");
  //   } else {
  //     message.error(error.response.data.detail);
  //   }
  //   return Promise.reject(error);
  // }
);

export default service;
