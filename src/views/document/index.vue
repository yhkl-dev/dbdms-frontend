<template>
  <a-layout class="document">
    <a-row type="flex" :gutter="16">
      <a-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" :span="3">
        <div class="docuement-sidebar">
          <a-menu
            class="menu"
            mode="inline"
            :default-selected-keys="[$route.name]"
            @click="onClick"
          >
            <a-menu-item key="database">
              <a-icon type="database" />
              Database List
            </a-menu-item>
            <a-menu-item key="browse">
              <a-icon type="diff" />
              Browse Documents
            </a-menu-item>
            <a-menu-item key="compare">
              <a-icon type="diff" />
              Version Compare
            </a-menu-item>
          </a-menu>
        </div>
      </a-col>
      <!-- <a-col flex="1 1 200px" :xs="2" :sm="4" :md="6" :lg="8" :xl="10"> -->
      <a-col :xs="17" :sm="17" :md="17" :lg="17" :xl="17" :span="3">
        <a-layout-content>
          <router-view />
        </a-layout-content>
      </a-col>
      <a-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3" :span="3">
        On this page
        <div>
          @yhkl-dev
        </div>
      </a-col>
    </a-row>
  </a-layout>
</template>

<script>
import { getResourceList } from "@/apis/resources";
export default {
  name: "document",
  data() {
    return {
      current: "database",
      resourceList: {}
    };
  },
  methods: {
    fetchResourceList() {
      getResourceList().then(res => {
        console.log(res);
        this.resourceList = res.Content.Rows;
      });
    },
    onClick(e) {
      if (e.key !== this.$route.name) {
        this.$router.push({ name: e.key });
      }
    }
  },
  created() {
    this.fetchResourceList();
  }
};
</script>
<style>
.ant-menu-item-selected {
  color: #ffffff !important;
}
.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
  background-color: #0366d6;
  border-radius: 5px;
}
.ant-menu-vertical .ant-menu-item::after,
.ant-menu-vertical-left .ant-menu-item::after,
.ant-menu-vertical-right .ant-menu-item::after,
.ant-menu-inline .ant-menu-item::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  border-radius: 5px;
  /* border-right: 3px solid #1890ff; */
  transform: scaleY(0.0001);
  opacity: 0;
  transition: transform 0.15s cubic-bezier(0.215, 0.61, 0.355, 1),
    opacity 0.15s cubic-bezier(0.215, 0.61, 0.355, 1);
  content: "";
}
.ant-menu-inline,
.ant-menu-vertical,
.ant-menu-vertical-left {
  border-right: 0px solid #e8e8e8;
}
</style>
<style lang="scss" scoped>
.menu {
  background-color: inherit;
}
.document {
  width: 100%;
  height: 100%;
}
.docuement-sidebar {
  height: 100%;
}
.h3 {
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
.li {
  display: list-item;
  text-align: -webkit-match-parent;
}
.ul {
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
}
.filter-item {
  position: relative;
  display: block;
  padding: 8px 16px;
  margin-bottom: 4px;
  overflow: hidden;
  font-size: 14px;
  color: var(--color-text-secondary);
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  border-radius: 6px;
}
.filter-item.selected {
  color: var(--color-state-hover-primary-text);
  background-color: var(--color-bg-info-inverse);
}
</style>
