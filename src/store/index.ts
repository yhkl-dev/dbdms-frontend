import Vue from "vue";
import Vuex from "vuex";
import getters from "@/store/getters";

Vue.use(Vuex);

const modulesFiles = require.context("./modules", false, /\.ts$/);

const modules = modulesFiles
  .keys()
  .reduce((modules: any, modulePath: string) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
    const value = modulesFiles(modulePath);
    modules[moduleName] = value.default;
    return modules;
  }, {});

const store = new Vuex.Store({
  modules,
  getters
});

export default store;

// export default new Vuex.Store({
//   state: {},
//   mutations: {},
//   actions: {},
//   modules: {}
// });
