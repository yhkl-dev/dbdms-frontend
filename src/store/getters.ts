/*
 * @Author: github.com/yhkl-dev
 * @LastEditors: github.com/yhkl-dev
 * @Date: 2020-10-30 08:20:22
 * @LastEditTime: 2020-10-30 15:08:04
 * @Description: file content
 * @FilePath: \dbdms-frontend\src\store\getters.ts
 */
const getters = {
  token: (state: { user: { token: string } }) => state.user.token
};

export default getters;
