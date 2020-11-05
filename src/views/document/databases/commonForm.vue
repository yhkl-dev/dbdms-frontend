/* eslint-disable no-constant-condition */ /* eslint-disable
no-constant-condition */ /* eslint-disable no-constant-condition */
<template>
  <div>
    <a-modal
      :form-type="formType"
      :title="title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleSave"
      @cancel="Cancel"
    >
      <a-form-model
        size="small"
        ref="ruleForm"
        :model="form"
        :rules="rules"
        layout="horizontal"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="TYPE" prop="resourceType">
          <a-cascader
            :options="resourceTypeList"
            placeholder="please select resource type"
            @change="onChange"
          />
          <!-- <a-select
            v-model="form.resourceType"
            placeholder="please select resource type"
          >
            <a-select-option
              :value="item.resource_type_id"
              v-for="item in resourceTypeList"
              :key="item.resource_type_id"
            >
              {{ item.resource_type_name }}
            </a-select-option> -->
          <!-- </a-select> -->
        </a-form-model-item>
        <a-form-model-item label="NAME" prop="resourceName">
          <a-input v-model="form.resourceName" placeholder="resource name" />
        </a-form-model-item>
        <a-form-model-item label="USERNAME" prop="resourceUser">
          <a-input
            v-model="form.resourceUser"
            placeholder="resource user name"
          />
        </a-form-model-item>
        <a-form-model-item label="PASSWORD" prop="resourcePassword">
          <a-input
            v-model="form.resourcePassword"
            type="password"
            placeholder="resource password"
          />
        </a-form-model-item>
        <a-form-model-item label="RESOURCE IP" prop="resourceHostIP">
          <a-input
            v-model="form.resourceHostIP"
            placeholder="resource IP address (192.168.1.1)"
          />
        </a-form-model-item>
        <a-form-model-item label="PORT" prop="resourcePort">
          <a-input
            v-model.number="form.resourcePort"
            placeholder="resource port"
          />
        </a-form-model-item>

        <a-form-model-item label="DESCRIPTION" prop="resourceDescription">
          <a-input
            v-model="form.resourceDescription"
            type="textarea"
            placeholder="description for the resource"
          />
        </a-form-model-item>
      </a-form-model>
      <template slot="footer">
        <a-button @click="testConnection" size="small"
          >TEST CONNECTION</a-button
        >
        <a-button @click="handleSave" type="primary" size="small"
          >CONFIRM</a-button
        >
        <a-button @click="Cancel" size="small">CLOSE</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import { getResourceTypeList } from "@/apis/resources";
import { cloneDeep } from "lodash";
export default {
  name: "common-form",
  props: {
    title: {
      type: String,
      default: "ADD"
    },
    visible: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Object
    },
    confirmLoading: {
      type: Boolean,
      default: false
    },
    formType: {
      type: String,
      default: "ADD"
    },
    formData: { type: Object }
  },
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 17 },
      form: {
        resourceType: "",
        resourceName: this.formData.resource_name
          ? this.formData.resource_name
          : "",
        resourceUser: this.formData.resource_user
          ? this.formData.resource_user
          : "",
        resourcePassword: "",
        resourceHostIP: this.formData.resource_host_ip
          ? this.formData.resource_host_ip
          : "",
        resourcePort: this.formData.resource_port
          ? this.formData.resource_port
          : "",
        resourceDescription: this.formData.resource_description
          ? this.formData.resource_description
          : ""
      },
      queryTypeParams: {
        page: 1,
        pageSize: 100
      },
      resourceTypeList: []
    };
  },
  watch: {
    "form.resourceType"(value) {
      this.form.resourceType = value;
    }
  },
  methods: {
    fetResourceTypeList() {
      getResourceTypeList().then(res => {
        const result = cloneDeep(res.Content.Rows);
        this.resourceTypeList = this.treeTypes(result);
      });
    },
    handleSave() {
      console.log("handle save");
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$emit("handleOk", this.form);
          this.$refs.ruleForm.resetFields();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      // this.$emit("handleOk", this.form);
    },
    Cancel() {
      this.$emit("handleCancel", false);
    },
    onChange(value) {
      this.form.resourceType = value[value.length - 1];
    },
    testConnection() {
      const formString = "";
      this.$emit("handleTestConnection", formString);
    },
    treeTypes(typeList) {
      typeList.forEach(item => {
        item.label = item.resource_type_name;
        item.value = item.resource_type_id;
        const parentId = item.resource_parent_id;
        if (parentId !== 0) {
          typeList.forEach(ele => {
            if (ele.resource_type_id == parentId) {
              if (!ele.children) {
                ele.children = [];
              }
              ele.children.push(item);
            }
          });
        }
      });
      return typeList.filter(ele => ele.resource_parent_id === 0);
    }
  },
  created() {
    this.fetResourceTypeList();
  }
};
</script>
