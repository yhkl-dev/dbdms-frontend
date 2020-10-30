/*
 * @Author: github.com/yhkl-dev
 * @LastEditors: github.com/yhkl-dev
 * @Date: 2020-10-28 09:35:00
 * @LastEditTime: 2020-10-30 16:06:13
 * @Description: file content
 * @FilePath: \dbdms-frontend\src\router\index.ts
 */
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "../store";
import { notification } from "ant-design-vue";
import CommonPage from "./common";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  CommonPage,
  // UserPage
  {
    path: "/",
    name: "HomePage",
    component: () => import(/* webpackChunkName: "about" */ "@/components/layout/index.vue")
  }
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  routes,
  base: process.env.BASE_URL
});

router.beforeEach(async (to, from, next) => {
  console.log("alert check router", store.getters.token);
  if (!store.getters.token && to.path !== "/login" && to.path !== "/register") {
    notification.error({
      message: "Warning",
      description:
        "The current login information has expired, please log in again"
    });
    setTimeout(() => {
      next("/login");
    }, 1000);
    return;
  }
  // 滚动到顶部
  // chrome
  document.body.scrollTop = 0;
  // firefox
  next();
});

export default router;
