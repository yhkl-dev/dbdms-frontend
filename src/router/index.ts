import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "../store";
import { notification } from "ant-design-vue";
import CommonPage from "./common";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  // UserPage
  {
    path: "/",
    name: "Homepage",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/components/layout/index.vue"),
    children: [
      {
        path: "",
        name: "Homepage",
        component: () =>
          import(/* webpackChunkName: "about" */ "@/views/homepage/index.vue")
      },
      {
        path: "/document",
        name: "document",
        meta: {
          icon: "folder-open"
        },
        component: () =>
          import(/* webpackChunkName: "about" */ "@/views/document/index.vue"),
        children: [
          {
            path: "/compare",
            name: "compare",
            meta: {
              icon: "file"
            },
            component: () =>
              import(
                /* webpackChunkName: "about" */ "@/views/document/compare/index.vue"
              )
          },
          {
            path: "/database",
            name: "database",
            meta: {
              icon: "database"
            },
            component: () =>
              import(
                /* webpackChunkName: "about" */ "@/views/document/databases/index.vue"
              )
          },
          {
            path: "/browse",
            name: "browse",
            meta: {
              icon: "database"
            },
            component: () =>
              import(
                /* webpackChunkName: "about" */ "@/views/document/browse/index.vue"
              )
          }
        ]
      }
    ]
  },
  CommonPage
];

const router = new VueRouter({
  mode: "history",
  routes,
  base: process.env.BASE_URL
});

router.beforeEach(async (to, from, next) => {
  console.log("alert check token", store.getters.token);
  if (
    !store.getters.token &&
    // store.getters.token !== "undefined" &&
    to.path !== "/login" &&
    to.path !== "/register"
  ) {
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
