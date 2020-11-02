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
    <div>
      <a-modal
        title="ADD"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
          layout="horizontal"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item ref="username" label="username" prop="username">
            <a-input
              v-model="form.username"
              @blur="
                () => {
                  $refs.name.onFieldBlur();
                }
              "
            />
          </a-form-model-item>
          <a-form-model-item label="password" prop="password">
            <a-input type="password" v-model="form.password" />
          </a-form-model-item>
          <a-form-model-item label="port" prop="port">
            <a-input v-model="form.port" />
          </a-form-model-item>
          <a-form-model-item label="host ip" prop="ip">
            <a-input v-model="form.ip" />
          </a-form-model-item>
          <a-form-model-item label="description" prop="description">
            <a-input v-model="form.description" type="textarea" />
          </a-form-model-item>
          <a-form-model-item label="type" prop="type">
            <a-input v-model="form.type" />
          </a-form-model-item>
        </a-form-model>
      </a-modal>
    </div>
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
import { generateDocument } from "@/apis/documents";
export default {
  name: "document",
  data() {
    return {
      columns,
      ModalText: "Content of the modal",
      visible: false,
      confirmLoading: false,
      resourceParentTypeName: "Database", // db type
      resourceList: [],

      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
      other: "",
      form: {
        name: "",
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur"
          },
          {
            min: 3,
            max: 5,
            message: "Length should be 3 to 5",
            trigger: "blur"
          }
        ],
        region: [
          {
            required: true,
            message: "Please select Activity zone",
            trigger: "change"
          }
        ],
        date1: [
          { required: true, message: "Please pick a date", trigger: "change" }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "Please select at least one activity type",
            trigger: "change"
          }
        ],
        resource: [
          {
            required: true,
            message: "Please select activity resource",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "Please input activity form",
            trigger: "blur"
          }
        ]
      }
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
      console.log("xxxxxxxxxxxxxx");
      this.visible = true;
    },
    handleOk(e) {
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
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
