<template>
  <div class="database-style">
    <a-table
      :columns="columns"
      :data-source="resourceList"
      size="small"
      :rowKey="resourceList => resourceList.resource_id"
    >
      <span slot="customTitle">Resource Name</span>
      <!-- <span slot="tags" slot-scope="tags">
        <a-tag
          v-for="tag in tags"
          :key="tag"
          :color="
            tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'
          "
        >
          {{ tag.toUpperCase() }}
        </a-tag>
      </span> -->
      <span slot="action" slot-scope="column">
        <a @click="generateDocument(column.resource_id)">Generate doc</a>
        <a-divider type="vertical" />
        <a>Update</a>
        <a-divider type="vertical" />
        <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
      </span>
    </a-table>
  </div>
</template>

<script>
const columns = [
  {
    title: "TYPE",
    dataIndex: "resource_type.resource_type_name"
  },
  {
    title: "RESOURCE NAME",
    dataIndex: "resource_name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "resource_name" }
  },
  {
    title: "IP",
    dataIndex: "resource_host_ip"
  },
  {
    title: "USER",
    dataIndex: "resource_user"
  },
  {
    title: "PORT",
    dataIndex: "resource_port"
  },
  {
    title: "DESCRIPTION",
    dataIndex: "resource_description"
  },
  // {
  //   title: "PO",
  //   key: "tags",
  //   dataIndex: "tags",
  //   scopedSlots: { customRender: "tags" }
  // },
  {
    title: "ACTION",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];

import { getResourceList } from "@/apis/resources";
export default {
  name: "document",
  data() {
    return {
      columns,
      resourceParentTypeName: "Database", // db type
      resourceList: []
    };
  },
  methods: {
    fetchResourceList() {
      // eslint-disable-next-line
      getResourceList({ resource_type_name: this.resourceTypeName }).then(
        res => {
          console.log(res);
          this.resourceList = res.Content.Rows;
        }
      );
    },
    generateDocument(value) {
      console.log(value);
    }
  },
  created() {
    this.fetchResourceList();
  }
};
</script>
<style scoped>
.database-style {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: #fefefe;
}
</style>
