<template>
  <el-container class="layout-container">
    <el-header style="background: gray" >
      <el-row :gutter="10" style="width:100%;">
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="2"><div class="grid-content">
          DEVELOP</div></el-col>
        <el-col :xs="8" :sm="12" :md="14" :lg="16" :xl="20" class="header-link">
          <el-menu :default-active="activeIndex" class="el-menu-top " mode="horizontal" @select="handleSelect">
            <el-menu-item index="/" >SERVER</el-menu-item>
            <el-menu-item index="/database/db-list" >DOCUMENT</el-menu-item>
            <el-menu-item index="/user" >USER</el-menu-item>
          </el-menu>
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="2"><div class="grid-content">
          <el-button class="quit-btn" size="middle" type="text">QUIT</el-button></div>
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
.quit-btn {
  color: white;
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

.grid-content {
  min-height: 60px;
  line-height: 60px;
  font-weight: bold;
  color: #fefefe;
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
