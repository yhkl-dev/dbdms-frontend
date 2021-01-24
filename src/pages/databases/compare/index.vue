<template>
  <div class="compare">
    <h5>COMPARE</h5>
    <div class="doc-content">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-select v-model="queryVersionOptions.reourceID" size="mini" placeholder="CHOOSE RESOURCE">
            <el-option v-for="item in resourceList" :key="item.resource_id" :value="item.resource_name"></el-option>
          </el-select>
          <el-select v-model="queryVersionOptions.Version" size="mini" placeholder="CHOOSE VERSION">
            <el-option v-for="item in versionList" :key="item.version_name" :value="item.version_name"></el-option>
          </el-select>
          <el-select v-model="queryDocumentOptions.DocumentTableName" size="mini" placeholder="CHOOSE TABLE">
            <el-option v-for="item in documentTableList" :key="item.document_id" :value="item.document_table_name"></el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-select v-model="queryNewVersionOptions.reourceID" size="mini" placeholder="CHOOSE RESOURCE">
            <el-option v-for="item in resourceList" :key="item.resource_id" :value="item.resource_name"></el-option>
          </el-select>
          <el-select v-model="queryNewVersionOptions.Version" size="mini" placeholder="CHOOSE VERSION">
            <el-option v-for="item in newversionList" :key="item.version_name" :value="item.version_name"></el-option>
          </el-select>
          <el-select v-model="queryNewDocumentOptions.DocumentTableName" size="mini" placeholder="CHOOSE TABLE">
            <el-option v-for="item in newdocumentTableList" :key="item.document_id" :value="item.document_table_name"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <code-diff
        style="markdown-style"
        :old-string="oldStr"
        :new-string="newStr"
        :context="3"
        outputFormat="side-by-side"
      />
    </div>
  </div>
</template>

<script>
import { getResourceList } from '@/apis/resources'
import { getDocumentList, getDocumentVersionList } from '@/apis/documents'
import CodeDiff from '@/components/code-diff/index'

export default {
  name: 'compare',
  components: {
    CodeDiff
  },
  data () {
    return {
      queryVersion: '',
      resourceList: [],
      newdocumentList: [],
      documentList: [],
      documentTableList: [],
      newdocumentTableList: [],
      newversionList: [],
      versionList: [],
      queryDocumentOptions: {
        DocumentDBName: '',
        DocumentTableName: '',
        reourceID: '',
        DocumentVersion: '',
        page: 1,
        pageSize: 100
      },
      queryVersionOptions: {
        ResouceID: '',
        Version: '',
        page: 1,
        pageSize: 1000
      },
      queryOptions: {
        resourceName: '',
        resourceIP: '',
        reousrceTypeName: '',
        resourceParentTypeName: 'Database',
        page: 1,
        pageSize: 100
      },
      queryNewDocumentOptions: {
        DocumentDBName: '',
        DocumentTableName: '',
        reourceID: '',
        DocumentVersion: '',
        page: 1,
        pageSize: 100
      },
      queryNewVersionOptions: {
        ResouceID: '',
        Version: '',
        page: 1,
        pageSize: 1000
      },
      queryNewOptions: {
        resourceName: '',
        resourceIP: '',
        reousrceTypeName: '',
        resourceParentTypeName: 'Database',
        page: 1,
        pageSize: 100
      },
      style: 'side-by-side',
      fotmat: false,
      oldStr: '',
      newStr: ''
    }
  },
  watch: {
    'queryNewVersionOptions.reourceID' (value) {
      if (!value) {
        this.queryNewVersionOptions.Version = ''
        return
      }
      this.resourceList.forEach(data => {
        if (data.resource_name === value) {
          this.queryNewDocumentOptions.resourceID = data.resource_id
        }
      })
      getDocumentVersionList({
        resource_id: this.queryNewDocumentOptions.resourceID,
        version: this.queryNewVersionOptions.Version,
        page: this.queryNewVersionOptions.page,
        page_size: this.queryNewVersionOptions.pageSize
      }).then(res => {
        this.newversionList = res.Content.Rows
      })
    },
    'queryNewVersionOptions.Version' (value) {
      if (!value) {
        return
      }
      this.queryNewDocumentOptions.DocumentVersion = value
      getDocumentList({
        document_db_name: this.queryNewDocumentOptions.DocumentDBName,
        document_table_name: this.queryNewDocumentOptions.DocumentTableName,
        document_version: value,
        resource_id: this.queryNewDocumentOptions.reourceID,
        page: this.queryNewDocumentOptions.page,
        page_size: this.queryNewDocumentOptions.pageSize
      }).then(res => {
        this.newdocumentTableList = res.Content.Rows
      })
    },
    'queryNewDocumentOptions.DocumentTableName' (value) {
      if (!value) {
        this.queryNewDocumentOptions.DocumentTableName = ''
        return
      }
      this.queryNewDocumentOptions.DocumentVersion = value
      getDocumentList({
        document_db_name: this.queryNewDocumentOptions.DocumentDBName,
        document_table_name: this.queryNewDocumentOptions.DocumentTableName,
        document_version: this.queryNewDocumentOptions.Version,
        resource_id: this.queryNewDocumentOptions.reourceID,
        page: this.queryNewDocumentOptions.page,
        page_size: this.queryNewDocumentOptions.pageSize
      }).then(res => {
        this.newdocumentList = res.Content.Rows
        if (this.newdocumentList.length !== 0) {
          this.newStr = this.newdocumentList[0].document_content
        }
      })
    },
    'queryVersionOptions.reourceID' (value) {
      if (!value) {
        this.queryVersionOptions.Version = ''
        return
      }
      this.resourceList.forEach(data => {
        if (data.resource_name === value) {
          this.queryVersionOptions.resourceID = data.resource_id
        }
      })
      getDocumentVersionList({
        resource_id: this.queryVersionOptions.resourceID,
        version: this.queryVersionOptions.Version,
        page: this.queryVersionOptions.page,
        page_size: this.queryVersionOptions.pageSize
      }).then(res => {
        this.versionList = res.Content.Rows
      })
    },
    'queryVersionOptions.Version' (value) {
      console.log(value)
      if (!value) {
        return
      }
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
        console.log('documentList', this.documentList)
        if (this.documentList.length !== 0) {
          this.oldStr = this.documentList[0].document_content
        }
      })
    }
  },
  methods: {
    fetchResourceList () {
      getResourceList({
        resource_type_name: this.queryOptions.resourceTypeName,
        resource_parent_type_name: this.queryOptions.resourceParentTypeName,
        resource_name: this.queryOptions.resourceName,
        page: this.queryOptions.page,
        page_size: this.queryOptions.pageSize
      }).then(res => {
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
        this.oldStr = this.documentList[0].document_content
      })
    },
    fetchDocumentVersionList () {
      getDocumentVersionList({
        resource_id: this.queryVersionOptions.reourceID,
        version: this.queryVersionOptions.Version,
        page: this.queryVersionOptions.page,
        page_size: this.queryVersionOptions.pageSize
      }).then(res => {
        this.versionList = res.Content.Rows
      })
    },
    onChange (value) {
      this.queryVersionOptions.reourceID = value
      this.fetchDocumentVersionList()
    },
    onVersionChange (value) {
      this.DocumentVersion = value
      this.queryDocumentOptions.DocumentVersion = value
      this.fetchDocumentList()
    },
    onTableChange (value) {
      this.queryDocumentOptions.DocumentVersion = this.DocumentVersion
      this.queryDocumentOptions.DocumentTableName = value
      this.fetchDocumentList()
    }
  },
  created () {
    this.fetchResourceList()
  }
}
</script>

<style scoped>
.compare {
  background-color: #fefefe;
  border-radius: 4px;
  margin: 0 20px 20px 20px;
}

.doc-content {
  background-color: #fefefe;
}

.db {
  margin: 0 20px 20px 20px;
}
</style>
