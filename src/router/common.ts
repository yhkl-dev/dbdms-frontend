const CommonPage = {
  path: "/login",
  name: "login",
  component: () =>
    import(
      /* webpackChunkName: "tactics-template" */ "@/views/common/login.vue"
    )
};

export default CommonPage;
