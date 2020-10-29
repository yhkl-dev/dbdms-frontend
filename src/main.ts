/*
 * @Author: github.com/yhkl-dev
 * @LastEditors: github.com/yhkl-dev
 * @Date: 2020-10-28 09:35:00
 * @LastEditTime: 2020-10-29 13:39:21
 * @Description: file content
 * @FilePath: \dbdms-frontend\src\main.ts
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import { message, notification } from "ant-design-vue";

Vue.config.productionTip = false;
Vue.use(Antd);

Vue.prototype.$message = message;
Vue.prototype.$notification = notification;

message.config({
  duration: 2, // 持续时间
  top: `100px`, // 到页面顶部距离
  maxCount: 3 // 最大显示数, 超过限制时，最早的消息会被自动关闭
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
