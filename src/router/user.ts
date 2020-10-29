/*
 * @Author: github.com/yhkl-dev
 * @LastEditors: github.com/yhkl-dev
 * @Date: 2020-10-28 14:25:46
 * @LastEditTime: 2020-10-28 15:39:57
 * @Description: file content
 * @FilePath: \dbdms-frontend\src\router\user.ts
 */
const UserPage = {
  path: "/user",
  name: "user",
  component: () =>
    import(
      /* webpackChunkName: "tactics-template" */ "@/views/layout/Index.vue"
    )
  //     children: [
  //         {
  //             path: "/userList",
  //             name: "userList",
  //             component: () => import(/* webpackChunkName: "tactics-template" */ '@/views/user/Index.vue'),
  //         },

  //     ]
  // }
};
export default UserPage;
