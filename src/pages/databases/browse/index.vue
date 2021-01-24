<template>
  <div class="db">
    <h5>DOCUMENTS </h5>
    <h5>
      <span>NAME:</span>
      <el-select
        class="input-style"
        :disabled="disable"
        v-model="queryVersionOptions.ResouceID"
        size="mini" placeholder="CHOOSE DATABASE">
        <el-option
          v-for="item in resourceList"
          :key="item.resource_id"
          :value="item.resource_name">
        </el-option>
      </el-select>
      <span>SCHEMA:</span>
      <el-input
        disabled
        class="input-style"
        v-model="params.resourceSchema"
        size="mini"></el-input>
      <span>VERSION: </span>
      <el-select
        class="input-style"
        v-model="queryVersionOptions.Version"
        size="mini" placeholder="CHOOSE VERSION">
        <el-option
          v-for="item in versionList"
          :key="item.version_name"
          :value="item.version_name">
        </el-option>
      </el-select>
      <span>TABLE: </span>
      <el-select
        class="input-style"
        v-model="queryDocumentOptions.DocumentTableName"
        size="mini" placeholder="CHOOSE TABLE">
        <el-option
          v-for="item in documentTableList"
          :key="item"
          :value="item.document_table_name">
        </el-option>
      </el-select>
      &nbsp;<el-button type="primary" size="mini" @click="generateDocs">GENERATE DOCS</el-button>
    </h5>
    <el-divider ></el-divider>
    <div class="doc-content" v-loading="loading" >
      <div class="document-content" v-if="documentList.length !== 0">
        <div v-for="document in documentList" :key="document.document_id">
          <div class="markdown-body markdown-style">
            <VueMarkdown :source="document.document_content"></VueMarkdown>
          </div>
        </div>
      </div>
      <div class="no-data-content" v-else>
        <div>NO DATA. CHOOSE A VERSION TO CHECK </div>
      </div>
      <el-backtop target=".el-scrollbar__wrap" :right="80" :bottom="100" >
        <i class="el-icon-top"></i>
      </el-backtop>
    </div>
  </div>
</template>

<script>
import { getDocumentList, getDocumentVersionList, generateDocument } from '@/apis/documents'
import { getResourceList } from '@/apis/resources'
import VueMarkdown from 'vue-markdown'
export default {
  name: 'browse',
  components: {
    VueMarkdown
  },
  data () {
    return {
      params: {},
      loading: false,
      disable: false,
      versionList: [],
      documentList: [],
      resourceList: [],
      resourceNameList: [],
      documentTableList: [],
      queryVersionOptions: {
        ResouceID: '',
        Version: '',
        page: 1,
        pageSize: 1000
      },
      queryDocumentOptions: {
        DocumentDBName: '',
        DocumentTableName: '',
        reourceID: '',
        DocumentVersion: '',
        page: 1,
        pageSize: 100
      },
      queryOptions: {
        resourceName: '',
        resourceIP: '',
        reousrceTypeName: '',
        resourceParentTypeName: 'Database',
        page: 1,
        pageSize: 100
      }
    }
  },
  watch: {
    'queryVersionOptions.ResouceID' (value) {
      if (!value) {
        return
      }
      this.loading = true
      this.resourceList.forEach(data => {
        if (data.resource_name === value) {
          console.log('data', data)
          this.queryDocumentOptions.ResouceID = data.resource_id
          this.params.resourceSchema = data.resource_database_name
          this.fetchDocumentVersionList(data.resource_id)
        }
      })
      this.loading = false
    },
    'queryVersionOptions.Version' (value) {
      if (!value) {
        return
      }
      this.loading = true
      this.queryDocumentOptions.Version = value
      getDocumentList({
        document_db_name: this.queryDocumentOptions.DocumentDBName,
        document_table_name: this.queryDocumentOptions.DocumentTableName,
        document_version: value,
        resource_id: this.queryDocumentOptions.reourceID,
        page: this.queryDocumentOptions.page,
        page_size: this.queryDocumentOptions.pageSize
      }).then(res => {
        this.documentTableList = res.Content.Rows
        this.documentList = res.Content.Rows
        this.loading = false
      })
    },
    'queryDocumentOptions.DocumentTableName' (value) {
      if (!value) {
        this.queryDocumentOptions.DocumentTableName = ''
        return
      }
      this.queryDocumentOptions.DocumentTableName = value
      getDocumentList({
        document_db_name: this.queryDocumentOptions.DocumentDBName,
        document_table_name: this.queryDocumentOptions.DocumentTableName,
        document_version: this.queryDocumentOptions.Version,
        resource_id: this.queryDocumentOptions.reourceID,
        page: this.queryDocumentOptions.page,
        page_size: this.queryDocumentOptions.pageSize
      }).then(res => {
        this.documentList = res.Content.Rows
      })
    }
  },
  methods: {
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
    fetchDocumentList () {
      getDocumentList({
        document_db_name: this.queryDocumentOptions.DocumentDBName,
        document_table_name: this.queryDocumentOptions.DocumentTableName,
        document_version: this.queryDocumentOptions.DocumentVersion,
        resource_id: this.queryDocumentOptions.reourceID,
        page: this.queryDocumentOptions.page,
        page_size: this.queryDocumentOptions.pageSize
      }).then(res => {
        this.documentList = res.Content.Rows
      })
    },
    fetchDocumentVersionList (resourceID) {
      getDocumentVersionList({
        resource_id: resourceID,
        version: this.queryVersionOptions.Version,
        page: this.queryVersionOptions.page,
        page_size: this.queryVersionOptions.pageSize
      }).then(res => {
        this.versionList = res.Content.Rows
      })
    },
    generateDocs () {
      generateDocument(this.queryDocumentOptions.ResouceID).then(res => {
        this.$notify({
          message: 'Generating success',
          description: '@yhkl-dev'
        })
      })
    }
  },
  created () {
    this.params = this.$route.params
    console.log(this.params, this.$route.params)
    this.fetchResourceList()
    if (this.params.resourceID) {
      this.disable = true
      this.fetchDocumentVersionList(this.$route.params.resourceID)
    }
  }
}
</script>
<style scoped>
.no-data-content {
  justify-items: center;
  justify-content: center;
  align-content: center;
}
.input-style {
  width: 200px
}

.doc-content {
  bottom: 1px;
  overflow-x: hidden;
}
.db {
  margin: 0 20px 20px 20px;
  overflow-x: hidden;
}
.document-content .page-component__scroll .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
