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
    <common-form
      :title="title"
      :visible="visible"
      :confirmLoading="confirmLoading"
      :formData="formData"
      :formRules="formRules"
      @handleSave="handleSave"
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

import { formRules, formData } from "./common.js";
import { getResourceList } from "@/apis/resources";
import { generateDocument } from "@/apis/documents";
import commonForm from "./common-form";
export default {
  name: "document",
  components: {
    commonForm
  },
  data() {
    return {
      columns,
      title: "ADD",
      visible: false,
      confirmLoading: false,
      resourceParentTypeName: "Database", // db type
      resourceList: [],

      labelCol: { span: 7 },
      wrapperCol: { span: 17 },
      other: "",
      formData: formData,
      formRules: formRules
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
    handleSave(value) {
      console.log("handle save", value);
    },
    handleOk(e) {
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel(value) {
      console.log("Clicked cancel button", value);
      this.visible = value;
    },
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
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
