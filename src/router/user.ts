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
