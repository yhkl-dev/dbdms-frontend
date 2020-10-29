/*
 * @Author: github.com/yhkl-dev
 * @LastEditors: github.com/yhkl-dev
 * @Date: 2020-10-29 12:17:22
 * @LastEditTime: 2020-10-29 13:30:57
 * @Description: file content
 * @FilePath: \dbdms-frontend\src\store\modules\user.ts
 */
import { login } from "@/apis/user";
import { getToken, setToken, removeToken } from "@/utils/auth";

const user = {
  state: {
    token: getToken(),
    username: ""
  },

  mutations: {
    SET_TOKEN: (state: any, token: string) => {
      state.token = token;
    },
    SET_USERNAME: (state: any, username: string) => {
      state.username = username;
    }
  },

  actions: {
    // 登录
    Login({ commit }: any, userInfo: any) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        login(username, userInfo.userPassword)
          .then(response => {
            commit("SET_TOKEN", response.Content.ACCESS_TOKEN);
            setToken(response.Content['ACCESS_TOKEN']);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 登出
    LogOut({ commit, state }: any) {
      commit("SET_TOKEN", "");
      removeToken();
    },

    // 前端 登出
    FedLogOut({ commit }: any) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        removeToken();
        resolve();
      });
    }
  }
};

export default user;
