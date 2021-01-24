<template>
  <div class="container">
    <el-row class="tac" style="height: 100%">
      <el-col :xs="6" :sm="6" :md="4" :lg="4" :xl="3">
        <el-menu
          router
          :default-active="$route.path"
          style="height: 100%"
          class="el-menu-vertical-demo"
          active-text-color="#fefefe">
          <el-menu-item index="/database/db-list" @click="$router.push('/database/db-list')">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">DATABASES</span>
          </el-menu-item>
          <el-menu-item index="/database/db-docs">
            <i class="el-icon-document"></i>
            <span slot="title">DATABASE DOCS</span>
          </el-menu-item>
          <el-menu-item index="/database/compare">
            <i class="el-icon-setting"></i>
            <span slot="title">COMPARE DOCS</span>
          </el-menu-item>
          <el-menu-item index="/database/monitor">
            <i class="el-icon-monitor"></i>
            <span slot="title">MONITOR</span>
          </el-menu-item>
          <el-menu-item index="/database/midware">
            <i class="el-icon-setting"></i>
            <span slot="title">MIDWARE</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :xs="12" :sm="15" :md="16" :lg="16" :xl="18">
        <router-view></router-view>
      </el-col>
       <el-col :xs="4" :sm="3" :md="4" :lg="4" :xl="3">
        <h5>@yhkl-dev</h5>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'DOCS'
}
</script>
<style scoped>
.container {
  height: 100%;
}
.database-table {
  padding: 10px;
}
.el-menu {
  border-right: 0;
}

.el-menu-item {
  border-radius: 5px;
}

.el-menu-item.is-active {
  background-color: #3370ff !important;
  color: #ffffff;
  /* span {
    color: #ffffff !important;
  } */
}
</style>
