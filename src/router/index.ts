/*
 * @Author: github.com/yhkl-dev
 * @LastEditors: github.com/yhkl-dev
 * @Date: 2020-10-28 09:35:00
 * @LastEditTime: 2020-10-28 16:30:55
 * @Description: file content
 * @FilePath: \dbdms-frontend\src\router\index.ts
 */
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import CommonPage from "./common";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  CommonPage,
  // UserPage
  {
    path: "/",
    name: "Home",
    component: Home
  },
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
  base: process.env.BASE_URL,
  routes
});

export default router;
