<template>
  <div class="document" style="width: 100%">
    Welcome to Database document System
    <a-table
      style="margin-left: 10px"
      :columns="columns"
      :data-source="resourceList"
      size="small"
      :pagination="paginationOptions"
    >
    </a-table>
  </div>
</template>

<script>
const columns = [
  {
    title: "TYPE",
    dataIndex: "resource_type.resource_type_name",
  },
  {
    title: "NAME",
    dataIndex: "resource_name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "resource_name" },
  },
  {
    title: "IP ADDRESS",
    dataIndex: "resource_host_ip",
  },
  {
    title: "USER",
    dataIndex: "resource_user",
  },
  {
    title: "PORT",
    dataIndex: "resource_port",
  },
  {
    title: "DESCRIPTION",
    dataIndex: "resource_description",
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
    scopedSlots: { customRender: "action" },
  },
];

import { getResourceList } from "@/apis/resources";
export default {
  name: "index",
  data() {
    return {
      columns,
      resourceList: [],
      paginationOptions: {
        size: "small",
        defaultPageSize: 10,
        current: 1,
        total: 0,
        resourceParentTypeName: "Linux",
        pageSizeOptions: ["10", "20", "50"],
        showTotal: (total) => `Total ${total} items`,
        onChange: (current) => {
          console.log(current);
          this.paginationOptions.current = current;
          this.fetchResourceList();
        },
      },
    };
  },
  methods: {
    fetchResourceList() {
      getResourceList({
        // eslint-disable-next-line
        resource_type_name: "Linux",
        page: this.paginationOptions.current,
        // eslint-disable-next-line
        page_size: 10,
      }).then((res) => {
        console.log(res);

        this.resourceList = res.Content.Rows;
        if (this.resourceList) {
          this.paginationOptions.current = res.Content.Page;
          this.paginationOptions.total = res.Content.Total;
        }
      });
    },
  },
  created() {
    this.fetchResourceList();
  },
};
</script>

<style scoped>
.document {
  width: 100%;
  height: 100%;
}
</style>
