<template>
  <el-container class="layout-container">
    <el-header style="background: gray" >
      <el-row :gutter="10" style="width:100%;">
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="2"><div class="grid-content">
          DEVELOP</div></el-col>
        <el-col :xs="8" :sm="12" :md="14" :lg="16" :xl="18" class="header-link">
          <el-menu :default-active="activeIndex" class="el-menu-top " mode="horizontal" @select="handleSelect">
            <el-menu-item index="/" >SERVER</el-menu-item>
            <el-menu-item index="/database/db-list" >DOCUMENT</el-menu-item>
            <el-menu-item index="/user" >USER</el-menu-item>
          </el-menu>
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="2"><div class="grid-content">
          <el-button size="small" type="text">QUIT</el-button></div>
        </el-col>
      </el-row>
    </el-header>
    <el-scrollbar style="height: 100%;">
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-scrollbar>
    <el-footer style="background: gray">
      <div class="footer-content">@yhkl-dev</div>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: 'Layout',
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      this.$router.push(key)
    }
  }
}
</script>

<style style="scss" scoped>

.el-menu-item.is-active {
  background-color: #808080 !important;
  color: #ffffff;
  /* span {
    color: #ffffff !important;
  } */
}
.el-menu-item {
  font-size: 15px;
  color: #ffffff;
  padding: 0 20px;
  cursor: pointer;
  -webkit-transition: border-color .3s,background-color .3s,color .3s;
  transition: border-color .3s,background-color .3s,color .3s;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.el-menu--horizontal>.el-menu-item.is-active {
  border-bottom: 0;
  color: #ffffff;
}
.el-menu-top {
  background: #808080;
  font-weight: bold;
  color: #fefefe;
}
.layout-container {
  height: 100%;
}

.bg-purple {
    background: #d3dce6;
}

.grid-content {
  min-height: 60px;
  line-height: 60px;
  font-weight: bold;
  color: #fefefe;
}

.grid-link {
  min-height: 60px;
  line-height: 60px;
  font-weight: bold;
  color: #fefefe;
  margin-left: 20px;
}

.header {
  border-top: 0.4em solid #4b0380;
  background-color: #fefefe;
  position: relative;
  z-index: 1;
  /* display: block; */
}
.header::before {
  background: #50b7eb;
  left: -0.2em;
}
.header::after {
  background: #eb5050;
  right: -0.2em;
}
.header::after,
.header::before {
  content: "";
  display: block;
  height: 0.3em;
  position: absolute;
  top: -0.4em;
  -webkit-transform: skewX(-45deg);
  transform: skewX(-45deg);
  width: calc(25% + 0.2em);
}
/* *,
*::after,
*::before {
  -webkit-box-sizing: inherit;
  box-sizing: inherit;
} */
.header-content {
  background-color: #f2f4f5;
  -ms-flex-align: start;
  align-items: flex-start;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.header-logo {
  position: relative;
  color: #424242;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  font-size: 1.7rem;
  font-weight: 400;
  line-height: 1.875;
  margin: 0 1.25em 0.75em 0;
  padding-left: 2.25em;
  text-decoration: none;
}
.header-logo::before {
  /* background-image: url("../../assets/database.png"); */
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  content: "";
  display: block;
  font-size: 0.75rem;
  height: 3em;
  left: 1em;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 3em;
  color: #1c9ad9;
  text-decoration: none;
}
.header-logo:visited {
  color: #424242;
}
/* .header-link { */
  /* display: inline; */
  /* position: relative;
  color: #424242;
  flex-shrink: 0;
  font-size: 1.6rem;
  padding-left: 2.25em; */
/* } */
.title {
  margin-left: 0.5em;
}
.icon-style {
  color: #50b7eb;
}
.content {
  padding: 0 2%;
  height: 100%;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -ms-flex: 1 0 auto;
  flex: 1 0 auto;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin-bottom: 6em;
  margin-top: 2.4em;
}
.footer {
  background: #f0f2f5;
  padding: 1.2em 0;
  /* // display: block; */
  text-align: center;
}
.footer-content {
  padding: 0 2%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  line-height: 60px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}
a {
  text-decoration: none;
  font-weight: bold;
}
.router-link-active {
  text-decoration: none;
  font-weight: bold;
}
</style>
