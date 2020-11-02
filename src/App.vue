<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  background: #fcfbfa;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #726e6c;
  height: 100%;
  font-family: Muli, helvetica neue, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  --antd-wave-shadow-color: #0366d6;
  /*font-size: 62.5%;*/
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
