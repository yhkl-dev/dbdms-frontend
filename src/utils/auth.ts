import Cookies from "js-cookie";

const TokenKey = "ACCESS_TOKEN";

export function getToken() {
  console.log("test>>>", Cookies.get(TokenKey));
  return Cookies.get(TokenKey);
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
