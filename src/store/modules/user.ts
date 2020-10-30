/*
 * @Author: github.com/yhkl-dev
 * @LastEditors: github.com/yhkl-dev
 * @Date: 2020-10-29 12:17:22
 * @LastEditTime: 2020-10-30 09:52:51
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
    SET_TOKEN: (state: { token: string }, token: string) => {
      state.token = token;
    },
    SET_USERNAME: (state: { username: string }, username: string) => {
      state.username = username;
    }
  },

  actions: {
    // 登录
    Login(
      // eslint-disable-next-line
      { commit }: any,
      userInfo: {
        username: string;
        userPassword: string;
      }
    ) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        login(username, userInfo.userPassword)
          .then(
            (response: {
              Content: { [x: string]: string; ACCESS_TOKEN: string };
            }) => {
              commit("SET_TOKEN", response.Content.ACCESS_TOKEN);
              setToken(response.Content["ACCESS_TOKEN"]);
              resolve();
            }
          )
          .catch((error: string) => {
            reject(error);
          });
      });
    },

    // 登出
    // eslint-disable-next-line
    LogOut({ commit }: any) {
      commit("SET_TOKEN", "");
      removeToken();
    },

    // 前端 登出
    // eslint-disable-next-line
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
