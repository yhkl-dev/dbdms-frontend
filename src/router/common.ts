/*
 * @Author: github.com/yhkl-dev
 * @LastEditors: github.com/yhkl-dev
 * @Date: 2020-10-28 12:23:22
 * @LastEditTime: 2020-10-28 16:32:50
 * @Description: file content
 * @FilePath: \dbdms-frontend\src\router\common.ts
 */
// const newLocal = '@/views/common/index.vue';

const CommonPage = {
  path: "/login",
  name: "login",
  component: () =>
    import(
      /* webpackChunkName: "tactics-template" */ "@/views/common/login.vue"
    )
};

// const CommonPage = {
//     path: "/common",
//     name: "common",
//     routeName: 'common',
//     meta: {
//         name: '公共页面'
//     },
//     children: [{
//         path: "/login",
//         name: "login",
//         component: () => import(/* webpackChunkName: "tactics-template" */ '@/views/common/login.vue')
//     }]
// };

export default CommonPage;
