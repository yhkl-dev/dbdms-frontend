
<template>
  <div>
    <h4>OVERVIEW</h4>
    <el-button size="mini" type="primary">ADD</el-button>
    <el-button size="mini" type="primary">QUERY</el-button>
    <el-table :data="resourceList" size="small" fit
      :header-cell-style="{'border-bottom': '1px rgb(103, 194, 58) solid'}"
      empty-text="NO DATA"
      >
      <el-table-column prop="resource_name"
        label="RESOURCE">
      </el-table-column>
      <el-table-column prop="resource_host_ip"
        label="IP">
      </el-table-column>
      <el-table-column prop="resource_port"
        label="PORT">
      </el-table-column>
       <el-table-column prop="resource_user"
        label="USER"
        >
      </el-table-column>
      <el-table-column prop="resource_description"
        label="DESCRIPTION">
      </el-table-column>
      <el-table-column fixed="right"  label="" >
        <template slot-scope="scope">
          <el-button type="text" size="small">VIEW</el-button>
          <el-button type="text" size="small">EDIT</el-button>
          <el-button type="text" size="small">DELETE</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getResourceList, getResourceTypeList } from '@/apis/resources'
export default {
  name: 'homepage',
  data () {
    return {
      resourceTypeName: '',
      emptyData: 'NO DATA',
      resourceList: [],
      resourceTypeList: [],
      projectList: [
        {
          'project_name': 'TEST',
          'project_owner': 'YHKL'
        }
      ],
      userList: [
        {
          'user_name': 'YHKL',
          'email': 'YHKL@163.com',
          'phone': '17642093930'
        }
      ]
    }
  },
  methods: {
    fetResourceTypeList () {
      getResourceTypeList().then(res => {
        // const result = cloneDeep(res.Content.Rows)
        this.resourceTypeList = res.Content.Rows
        // this.resourceTypeList = this.treeTypes(result);
      })
    },
    fetchResourceList () {
      getResourceList({
        // eslint-disable-next-line
        resource_type_name: this.resourceTypeName,
        page: 1,
        // eslint-disable-next-line
        pageSize: 10
      }).then(res => {
        this.resourceList = res.Content.Rows
      })
    }
  },
  created () {
    this.fetchResourceList()
    this.fetResourceTypeList()
  }
}
</script>

<style scoped>
.table-header {
  font-weight: bold;
  font-family: 'Courier New', Courier, monospace;
}
</style>
