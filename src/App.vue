<!--
 * @Author: github.com/yhkl-dev
 * @LastEditors: github.com/yhkl-dev
 * @Date: 2020-10-30 08:20:22
 * @LastEditTime: 2020-10-30 16:53:19
 * @Description: file content
 * @FilePath: \dbdms-frontend\src\App.vue
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;

  background: #fcfbfa;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #726e6c;
  font-family: Muli, helvetica neue, Helvetica, Arial, sans-serif;
  font-size: 62.5%;
  line-height: 1.5;
  overflow-x: hidden;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
