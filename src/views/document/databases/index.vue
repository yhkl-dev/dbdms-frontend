<template>
  <div class="database-style">
    <div style="margin-left: 10px; ">
      <a-button
        style="margin-top: 10px"
        size="small"
        type="primary"
        @click="showModal"
        >ADD</a-button
      >
    </div>
    <a-table
      style="margin-left: 10px"
      :columns="columns"
      :data-source="resourceList"
      size="small"
      :pagination="paginationOptions"
      :rowKey="resourceList => resourceList.resource_id"
    >
      <span slot="action" slot-scope="column">
        <a @click="generateDocument(column.resource_id)">Generate doc</a>
        <a-divider type="vertical" />
        <a @click="handleUpdateResource(column)">Update</a>
        <a-divider type="vertical" />
        <a class="ant-dropdown-link">More actions <a-icon type="down" /> </a>
      </span>
      <template slot="pagination">
        <a-pagination />
      </template>
    </a-table>
    <common-form
      :title="title"
      :visible="visible"
      :rules="rules"
      :confirm-loading="confirmLoading"
      :formData="formData"
      @handleOk="handleOk"
      @handleCancel="handleCancel"
    ></common-form>
  </div>
</template>

<script>
const columns = [
  {
    title: "TYPE",
    dataIndex: "resource_type.resource_type_name"
  },
  {
    title: "NAME",
    dataIndex: "resource_name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "resource_name" }
  },
  {
    title: "IP ADDRESS",
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

import rules from "./common";
import commonForm from "./commonForm";
import { getResourceList, SaveResource } from "@/apis/resources";
import { generateDocument } from "@/apis/documents";
export default {
  name: "document",
  components: { commonForm },
  data() {
    return {
      columns,
      formData: {},
      title: "ADD",
      visible: false,
      formType: "ADD",
      confirmLoading: false,
      resourceParentTypeName: "Database", // db type
      resourceList: [],

      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
      rules: rules,
      page: 1,
      pageSize: 10,
      total: 0,
      paginationOptions: {
        size: "small",
        defaultPageSize: 10,
        current: 1,
        total: 0,
        pageSizeOptions: ["10", "20", "50"],
        showTotal: total => `Total ${total} items`,
        onChange: current => {
          console.log(current);
          this.paginationOptions.current = current;
          this.fetchResourceList();
        }
      }
    };
  },
  methods: {
    fetchResourceList() {
      getResourceList({
        // eslint-disable-next-line
        resource_type_name: this.resourceTypeName,
        page: this.paginationOptions.current,
        // eslint-disable-next-line
        page_size: 10
      }).then(res => {
        console.log(res);

        this.resourceList = res.Content.Rows;
        if (this.resourceList) {
          this.paginationOptions.current = res.Content.Page;
          this.paginationOptions.total = res.Content.Total;
        }
      });
    },
    generateDocument(value) {
      console.log(value);
      generateDocument(value).then(res => {
        console.log(res);
        this.$notification.success({
          message: "Generating success",
          description: ""
        });
      });
    },
    showModal() {
      this.visible = true;
    },
    handleUpdateResource(column) {
      this.title = "UPDATE";
      this.visible = true;
      this.formData = column;
      console.log(this.formData);
    },
    handleOk(form) {
      console.log("form", form);
      SaveResource(form)
        .then(res => {
          this.visible = false;
          this.$notification.success({
            message: res.Message,
            description: res.Content
          });
        })
        .catch(err => {
          this.$notification.err({
            message: "ERROR",
            description: err
          });
        });
    },
    handleCancel(value) {
      console.log("Clicked cancel button");
      this.visible = value;
    }
    // resetForm() {
    //   this.$refs.ruleForm.resetFields();
    // }
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
