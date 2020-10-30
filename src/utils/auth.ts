/*
 * @Author: github.com/yhkl-dev
 * @LastEditors: github.com/yhkl-dev
 * @Date: 2020-10-29 10:55:13
 * @LastEditTime: 2020-10-30 15:11:37
 * @Description: file content
 * @FilePath: \dbdms-frontend\src\utils\auth.ts
 */
import Cookies from "js-cookie";

const TokenKey = "ACCESS_TOKEN";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
