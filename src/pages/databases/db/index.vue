<template>
  <div class="db">
    <h5>RESOURCE</h5>
    <el-button size="mini" type="primary" @click="handleAddBtn">ADD</el-button>
    <el-button size="mini" type="primary" @click="reload">RELOAD</el-button>
    <el-button size="mini" type="primary">SEARCH</el-button>
    <el-table :data="resourceList" size="medium"
      fit
      v-loading="loading"
      :header-cell-style="{'border-bottom': '1px rgb(103, 194, 58) solid'}"
      empty-text="NO DATA">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="resource_name" label="NAME"></el-table-column>
      <el-table-column prop="resource_host_ip" label="IP"></el-table-column>
      <el-table-column prop="resource_port" label="PORT"></el-table-column>
      <el-table-column prop="resource_user" label="USER"></el-table-column>
      <el-table-column prop="resource_database_name" label="SCHEMA"></el-table-column>
      <el-table-column prop="resource_description" label="DESCRIPTION" width="300px"></el-table-column>
      <el-table-column fixed="right"  label="" width="220px">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="openDocs(scope.row)">VIEW DOCS</el-button>
          <el-button type="text" size="small" @click="changeResource(scope.row)">EDIT</el-button>
          <el-button class="delete-btn" type="text" size="small" @click="deleteResource(scope.row)">DELETE</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="35%">
      <el-form :model="resourceForm" :rules="rules" ref="resourceForm" label-width="120px" >
        <el-form-item label="TYPE" prop="resourceType" class="form-item">
          <el-cascader
            clearable
            class="form-input"
            size="mini"
            v-model="resourceForm.resourceType"
            placeholder="PLEASE SELECT DATABASE TYPE"
            @change="onChange"
            :options="resourceTypeList"
            >
          </el-cascader>
        </el-form-item>
        <el-form-item label="NAME" prop="resourceName" class="form-item">
          <el-input v-model="resourceForm.resourceName" class="form-input"
            size="mini" placeholder="PLEASE INPUT YOUR RESOURCE NAME"></el-input>
        </el-form-item>
        <el-form-item label="HOST" prop="resourceHostIP" class="form-item">
          <el-input v-model="resourceForm.resourceHostIP" class="form-input"
          size="mini" placeholder="PLEASE INPUT YOUR RESOURCE HOST/IP"></el-input>
        </el-form-item>
        <el-form-item label="PORT" prop="resourcePort" class="form-item">
          <el-input v-model="resourceForm.resourcePort" size="mini" class="form-input"
            placeholder="PLEASE INPUT YOUR RESOURCE PORT"></el-input>
        </el-form-item>
        <el-form-item label="USER" prop="resourceUser" class="form-item">
          <el-input v-model="resourceForm.resourceUser" size="mini" class="form-input"
          placeholder="PLEASE INPUT YOUR RESOURCE USERNAME"></el-input>
        </el-form-item>
        <el-form-item label="PASSWORD" prop="resourcePassword" class="form-item">
          <el-input v-model="resourceForm.resourcePassword" size="mini" class="form-input"
          type="password" placeholder="PLEASE INPUT YOUR RESOURCE PASSWORD"></el-input>
        </el-form-item>
        <el-form-item label="SCHEMA" prop="resourceSchema" class="form-item">
          <el-input v-model="resourceForm.resourceSchema" size="mini" class="form-input"
            placeholder="PLEASE INPUT YOUR RESOURCE DATABASE SCHEMA"></el-input>
        </el-form-item>
        <el-form-item label="DESCRIPTION" prop="resourceDescription" class="form-item">
          <el-input v-model="resourceForm.resourceDescription" size="mini" class="form-input"
          placeholder="PLEASE INPUT YOUR RESOURCE DESCRIPTION" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="testConnection">TEST CONNECTION</el-button>
        <el-button size="mini" type="primary" @click="saveResouce">CONFIRM</el-button>
        <el-button size="mini" @click="cancel('resourceForm')">CANCEL</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getResourceList, getResourceTypeList, addResource, deleteResource, updateResource, testDBConnection } from '@/apis/resources'
export default {
  name: 'db-list',
  data () {
    return {
      loading: false,
      dialogVisible: false,
      emptyData: 'NO DATA',
      dialogTitle: 'ADD',
      resourceID: '',
      resourceList: [],
      resourceTypeList: [],
      resourceForm: {
        resourceName: '',
        resourceType: '',
        resourceUser: '',
        resourcePassword: '',
        resourceHostIP: '',
        resourceSchema: '',
        resourcePort: '',
        resourceDescription: ''
      },
      rules: {
        resourceType: [
          { required: true, message: 'PLEASE CHOOSE RESOURCE TYPE', trigger: 'change' }
        ],
        resourceName: [
          { required: true, message: 'PLEASE INPUT YOUR RESOURCE NAME', trigger: 'blur' },
          { min: 5, max: 20, message: 'at least 5 characters', trigger: 'blur' }
        ],
        resourceUser: [
          { required: true, message: 'PLEASE INPUT YOUER RESOURCE USER', trigger: 'blur' }
        ],
        resourcePassword: [
          { required: true, message: 'PLEASE INPUT YOUER RESOURCE USER', trigger: 'blur' }
        ],
        resourceHostIP: [
          { required: true, message: 'PLEASE INPUT YOUER RESOURCE HOST/IP', trigger: 'blur' }
        ],
        resourcePort: [
          { type: 'number', required: true, message: 'PLEASE INPUT YOUER RESOURCE HOST PORT', trigger: 'blur' }
        ],
        resourceSchema: [
          { required: true, message: 'PLEASE INPUT YOUER RESOURCE DATABASE SCHEMA', trigger: 'blur' }
        ],
        resourceDescription: [
          { required: true, message: 'PLEASE INPUT YOUER RESOURCE DESCRIPTION', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    fetResourceTypeList () {
      getResourceTypeList().then(res => {
        const result = res.Content.Rows
        this.resourceTypeList = this.treeTypes(result)
      })
    },
    fetchResourceList () {
      this.loading = true
      getResourceList({
        resource_type_name: this.resourceTypeName,
        page: 1,
        pageSize: 10
      }).then(res => {
        this.loading = false
        this.resourceList = res.Content.Rows
      })
    },
    testConnection () {
      const data = {
        resource_type: {
          resource_type_id: this.resourceForm.resourceType
        },
        resource_host_ip: this.resourceForm.resourceHostIP,
        resource_user: this.resourceForm.resourceUser,
        resource_password: this.resourceForm.resourcePassword,
        resource_port: Number(this.resourceForm.resourcePort),
        resource_database_name: this.resourceForm.resourceSchema
      }
      console.log('data', data)
      testDBConnection(data).then(res => {
        console.log('res', res)
      })
    },
    saveResouce () {
      const data = {
        resource_type: {
          resource_type_id: this.resourceForm.resourceType
        },
        resource_name: this.resourceForm.resourceName,
        resource_host_ip: this.resourceForm.resourceHostIP,
        resource_user: this.resourceForm.resourceUser,
        resource_password: this.resourceForm.resourcePassword,
        resource_port: Number(this.resourceForm.resourcePort),
        resource_database_name: this.resourceForm.resourceSchema,
        resource_description: this.resourceForm.resourceDescription
      }
      if (this.dialogTitle === 'ADD') {
        addResource(data).then(res => {
          this.dialogVisible = false
          this.$refs.resourceForm.resetFields()
          this.reload()
          this.$notify({
            title: 'ADD RESOURCE SUCCESS',
            message: '@yhkl-dev',
            type: 'success'
          })
        })
      } else {
        updateResource(this.resourceID, data).then(res => {
          this.dialogVisible = false
          this.$refs.resourceForm.resetFields()
          this.reload()
          this.$notify({
            title: 'UPDATE RESOURCE SUCCESS',
            message: '@yhkl-dev',
            type: 'success'
          })
        })
      }
    },
    changeResource (row) {
      this.dialogTitle = 'UPDATE'
      this.dialogVisible = true
      if (this.$refs['resourceForm'] !== undefined) {
        this.$refs['resourceForm'].resetFields()
      }
      this.resourceID = row.resource_id
      this.resourceForm.resourceName = row.resource_name
      this.resourceForm.resourceType = row.resource_type.resource_type_id
      this.resourceForm.resourceUser = row.resource_user
      this.resourceForm.resourcePassword = row.resource_password
      this.resourceForm.resourcePort = row.resource_port
      this.resourceForm.resourceSchema = row.resource_database_name
      this.resourceForm.resourceHostIP = row.resource_host_ip
      this.resourceForm.resourceDescription = row.resource_description
    },
    deleteResource (row) {
      this.$confirm('DELETE ' + row.resource_name + ' ?', 'NOTE', {
        distinguishCancelAndClose: true,
        cancelButtonText: 'CANCEL',
        confirmButtonText: 'CONFIRM',
        type: 'warning'
      }).then(() => {
        deleteResource(row.resource_id).then(() => {
          this.$notify({
            title: 'DELETE SUCCESS',
            message: '@yhkl-dev',
            type: 'success'
          })
          this.reload()
        })
      }).catch(() => {
        this.$notify({
          title: 'DELETE FAILED',
          message: '@yhkl-dev',
          type: 'error'
        })
      })
    },
    cancel (formName) {
      this.dialogVisible = false
      this.$refs[formName].resetFields()
    },
    reload () {
      this.fetchResourceList()
      this.fetResourceTypeList()
    },
    handleAddBtn () {
      if (this.$refs['resourceForm'] !== undefined) {
        this.$refs['resourceForm'].resetFields()
      }
      this.dialogVisible = true
    },
    openDocs (row) {
      this.$router.push({name: 'db-docs', params: { resourceID: row.resource_id, resourceName: row.resource_name, resourceSchema: row.resource_database_name }})
    },
    onChange (value) {
      this.resourceForm.resourceType = value[value.length - 1]
    },
    treeTypes (typeList) {
      typeList.forEach(item => {
        item.label = item.resource_type_name
        item.value = item.resource_type_id
        const parentId = item.resource_parent_id
        if (parentId !== 0) {
          typeList.forEach(ele => {
            if (ele.resource_type_id === parentId) {
              if (!ele.children) {
                ele.children = []
              }
              ele.children.push(item)
            }
          })
        }
      })
      return typeList.filter(ele => ele.resource_parent_id === 0)
    }
  },
  created () {
    this.fetchResourceList()
    this.fetResourceTypeList()
  }
}
</script>

<style scoped>
.db {
  margin: 0 20px 20px 20px;
}
.form-item {
  font-weight: bold;
}
.form-input {
  width: 100%
}
.delete-btn {
  color: red;
}
</style>
