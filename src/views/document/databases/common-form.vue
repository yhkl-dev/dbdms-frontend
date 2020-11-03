<template>
  <div>
    <a-modal
      :title="title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOK"
      @cancel="handleCancel"
    >
      <a-form-model
        ref="ruleForm"
        :model="formData"
        :rules="formRules"
        layout="horizontal"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="RESOURCE NAME" prop="resourceName">
          <a-input type="text" />
        </a-form-model-item>
        <!-- <a-form-model-item ref="username" label="USERNAME" prop="username">
          <a-input v-model="formData.username" />
        </a-form-model-item> -->
        <!-- <a-form-model-item label="PASSWORD" prop="password">
          <a-input type="password" v-model="formData.password" />
        </a-form-model-item>
        <a-form-model-item label="IP ADDRESS" prop="ip">
          <a-input v-model="formData.ip" />
        </a-form-model-item>
        <a-form-model-item label="PORT" prop="port">
          <a-input v-model="formData.port" />
        </a-form-model-item> -->
        <!-- <a-form-model-item label="RESOURCE TYPE" prop="type">
          <a-input v-model="formData.type" />
        </a-form-model-item> -->
        <!-- <a-form-model-item label="DESCRIPTION" prop="description">
          <a-input v-model="formData.description" type="textarea" />
        </a-form-model-item> -->
      </a-form-model>
      <template slot="footer">
        <a-button size="small">TEST CONNECTION</a-button>
        <a-button size="small" type="primary" @click="handleOK">SAVE</a-button>
        <a-button size="small" @click="handleCancel">CANCEL</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "commonForm",
  props: {
    title: { type: String, default: "ADD" },
    visible: { type: Boolean, default: false },
    handleSave: { type: Function },
    handleCanCel: { type: Function },
    confirmLoading: { type: Boolean, default: false },
    formData: { type: Object },
    formRules: { type: Object }
  },

  data() {
    return {
      labelCol: { span: 7 },
      wrapperCol: { span: 17 }
    };
  },
  methods: {
    handleCancel() {
      console.log("form", this.formData);
      console.log("cancel");
      this.$emit("handleCancel", false);
    },
    handleOK() {
      console.log("ok");
      this.$emit("handleSave", "data");
    }
  }
};
</script>
