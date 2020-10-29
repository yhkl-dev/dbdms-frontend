/*
 * @Author: github.com/yhkl-dev
 * @LastEditors: github.com/yhkl-dev
 * @Date: 2020-10-29 10:39:12
 * @LastEditTime: 2020-10-29 13:32:44
 * @Description: file content
 * @FilePath: \dbdms-frontend\src\apis\user.ts
 */
import request from "@/utils/request";

// user login
// eslint-disable-next-line @typescript-eslint/camelcase
export function login(user_name: string, user_password: string) {
  return request({
    url: "login",
    method: "post",
    data: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      user_name,
      // eslint-disable-next-line @typescript-eslint/camelcase
      user_password
    }
  });
}

// 用户列表
export function getUserList(params: JSON) {
  return request({
    url: "api/v1/users/",
    method: "get",
    params
  });
}
