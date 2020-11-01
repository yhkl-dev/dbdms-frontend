<template>
  <div style="compare">
    <div style="doc-content">
      <a-row>
        <a-col :span="12">
          <a-select
            allowClear
            size="small"
            style="width: 150px"
            v-model="queryVersionOptions.reourceID"
            placeholder="database"
          >
            <a-select-option
              :value="item.resource_id"
              v-for="item in resourceList"
              :key="item.resource_id"
            >
              {{ item.resource_name }}
            </a-select-option>
          </a-select>
          <a-select
            allowClear
            size="small"
            style="width: 150px"
            v-model="queryVersionOptions.Version"
            placeholder="document verison"
          >
            <a-select-option
              :value="item.version_name"
              v-for="item in versionList"
              :key="item.version_name"
            >
              {{ item.version_name }}
            </a-select-option>
          </a-select>
          <a-select
            allowClear
            size="small"
            style="width: 150px"
            v-model="queryDocumentOptions.DocumentTableName"
            placeholder="table"
          >
            <a-select-option
              :value="item.document_table_name"
              v-for="item in documentTableList"
              :key="item.document_id"
            >
              {{ item.document_table_name }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="12">
          <a-select
            allowClear
            size="small"
            style="width: 150px"
            v-model="queryNewVersionOptions.reourceID"
            placeholder="database"
          >
            <a-select-option
              :value="item.resource_id"
              v-for="item in resourceList"
              :key="item.resource_id"
            >
              {{ item.resource_name }}
            </a-select-option>
          </a-select>
          <a-select
            allowClear
            size="small"
            style="width: 150px"
            v-model="queryNewVersionOptions.Version"
            placeholder="document verison"
          >
            <a-select-option
              :value="item.version_name"
              v-for="item in newversionList"
              :key="item.version_name"
            >
              {{ item.version_name }}
            </a-select-option>
          </a-select>
          <a-select
            allowClear
            size="small"
            style="width: 150px"
            v-model="queryNewDocumentOptions.DocumentTableName"
            placeholder="table"
          >
            <a-select-option
              :value="item.document_table_name"
              v-for="item in newdocumentTableList"
              :key="item.document_id"
            >
              {{ item.document_table_name }}
            </a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <code-diff
        style="markdown-style"
        :old-string="oldStr"
        :new-string="newStr"
        context="3"
        outputFormat="side-by-side"
      />
    </div>
  </div>
</template>

<script>
import { getResourceList } from "@/apis/resources";
import { getDocumentList, getDocumentVersionList } from "@/apis/documents";
import CodeDiff from "@/components/index";

export default {
  components: { CodeDiff },
  data() {
    return {
      queryVersion: "",
      resourceList: [],
      newdocumentList: [],
      documentList: [],
      documentTableList: [],
      newdocumentTableList: [],
      newversionList: [],
      versionList: [],
      queryDocumentOptions: {
        DocumentDBName: "",
        DocumentTableName: "",
        reourceID: "",
        DocumentVersion: "",
        page: 1,
        pageSize: 100
      },
      queryVersionOptions: {
        ResouceID: "",
        Version: "",
        page: 1,
        pageSize: 1000
      },
      queryOptions: {
        resourceName: "",
        resourceIP: "",
        reousrceTypeName: "",
        resourceParentTypeName: "Database",
        page: 1,
        pageSize: 100
      },
      queryNewDocumentOptions: {
        DocumentDBName: "",
        DocumentTableName: "",
        reourceID: "",
        DocumentVersion: "",
        page: 1,
        pageSize: 100
      },
      queryNewVersionOptions: {
        ResouceID: "",
        Version: "",
        page: 1,
        pageSize: 1000
      },
      queryNewOptions: {
        resourceName: "",
        resourceIP: "",
        reousrceTypeName: "",
        resourceParentTypeName: "Database",
        page: 1,
        pageSize: 100
      },
      style: "side-by-side",
      fotmat: false,
      oldStr: "",
      newStr: ""
    };
  },
  watch: {
    "queryNewVersionOptions.reourceID"(value) {
      console.log(value);
      if (!value) {
        this.queryNewVersionOptions.Version = "";
        return;
      }
      this.queryNewDocumentOptions.reourceID = value;
      getDocumentVersionList({
        // eslint-disable-next-line @typescript-eslint/camelcase
        resource_id: value,
        version: this.queryNewVersionOptions.Version,
        page: this.queryNewVersionOptions.page,
        // eslint-disable-next-line @typescript-eslint/camelcase
        page_size: this.queryNewVersionOptions.pageSize
      }).then(res => {
        this.newversionList = res.Content.Rows;
      });
    },
    "queryNewVersionOptions.Version"(value) {
      console.log("vvvvvvvvvvvvv", value);
      if (!value) {
        return;
      }
      this.queryNewDocumentOptions.DocumentVersion = value;
      getDocumentList({
        // eslint-disable-next-line @typescript-eslint/camelcase
        document_db_name: this.queryNewDocumentOptions.DocumentDBName,
        // eslint-disable-next-line @typescript-eslint/camelcase
        document_table_name: this.queryNewDocumentOptions.DocumentTableName,
        // eslint-disable-next-line @typescript-eslint/camelcase
        document_version: value,
        // eslint-disable-next-line @typescript-eslint/camelcase
        resource_id: this.queryNewDocumentOptions.reourceID,
        page: this.queryNewDocumentOptions.page,
        // eslint-disable-next-line @typescript-eslint/camelcase
        page_size: this.queryNewDocumentOptions.pageSize
      }).then(res => {
        console.log("document list", res);
        this.newdocumentTableList = res.Content.Rows;
      });
    },
    "queryNewDocumentOptions.DocumentTableName"(value) {
      console.log("DocumentTableName", value);
      if (!value) {
        this.queryNewDocumentOptions.DocumentTableName = "";
        return;
      }
      this.queryNewDocumentOptions.DocumentVersion = value;
      getDocumentList({
        // eslint-disable-next-line @typescript-eslint/camelcase
        document_db_name: this.queryNewDocumentOptions.DocumentDBName,
        // eslint-disable-next-line @typescript-eslint/camelcase
        document_table_name: this.queryNewDocumentOptions.DocumentTableName,
        // eslint-disable-next-line @typescript-eslint/camelcase
        document_version: this.queryNewDocumentOptions.Version,
        // eslint-disable-next-line @typescript-eslint/camelcase
        resource_id: this.queryNewDocumentOptions.reourceID,
        page: this.queryNewDocumentOptions.page,
        // eslint-disable-next-line @typescript-eslint/camelcase
        page_size: this.queryNewDocumentOptions.pageSize
      }).then(res => {
        console.log("document list", res);
        this.newdocumentList = res.Content.Rows;
        if (this.newdocumentList.length !== 0) {
          this.newStr = this.newdocumentList[0].document_content;
        }
      });
    },
    "queryVersionOptions.reourceID"(value) {
      console.log(value);
      if (!value) {
        this.queryVersionOptions.Version = "";
        return;
      }
      this.queryVersionOptions.reourceID = value;
      // this.queryVersionOptions.Version = value;
      getDocumentVersionList({
        // eslint-disable-next-line @typescript-eslint/camelcase
        resource_id: value,
        version: this.queryVersionOptions.Version,
        page: this.queryVersionOptions.page,
        // eslint-disable-next-line @typescript-eslint/camelcase
        page_size: this.queryVersionOptions.pageSize
      }).then(res => {
        this.versionList = res.Content.Rows;
      });
    },
    "queryVersionOptions.Version"(value) {
      console.log(value);
      if (!value) {
        return;
      }
      this.queryDocumentOptions.Version = value;
      getDocumentList({
        // eslint-disable-next-line @typescript-eslint/camelcase
        document_db_name: this.queryDocumentOptions.DocumentDBName,
        // eslint-disable-next-line @typescript-eslint/camelcase
        document_table_name: this.queryDocumentOptions.DocumentTableName,
        // eslint-disable-next-line @typescript-eslint/camelcase
        document_version: value,
        // eslint-disable-next-line @typescript-eslint/camelcase
        resource_id: this.queryDocumentOptions.reourceID,
        page: this.queryDocumentOptions.page,
        // eslint-disable-next-line @typescript-eslint/camelcase
        page_size: this.queryDocumentOptions.pageSize
      }).then(res => {
        console.log("document list", res);
        this.documentTableList = res.Content.Rows;
      });
    },
    "queryDocumentOptions.DocumentTableName"(value) {
      console.log("vvvvvvvvvvvvv", value);
      if (!value) {
        this.queryDocumentOptions.DocumentTableName = "";
        return;
      }
      console.log("this.Version", this.queryDocumentOptions.Version);
      this.queryDocumentOptions.DocumentTableName = value;
      getDocumentList({
        // eslint-disable-next-line @typescript-eslint/camelcase
        document_db_name: this.queryDocumentOptions.DocumentDBName,
        // eslint-disable-next-line @typescript-eslint/camelcase
        document_table_name: this.queryDocumentOptions.DocumentTableName,
        // eslint-disable-next-line @typescript-eslint/camelcase
        document_version: this.queryDocumentOptions.Version,
        // eslint-disable-next-line @typescript-eslint/camelcase
        resource_id: this.queryDocumentOptions.reourceID,
        page: this.queryDocumentOptions.page,
        // eslint-disable-next-line @typescript-eslint/camelcase
        page_size: this.queryDocumentOptions.pageSize
      }).then(res => {
        console.log("document list", res);
        this.documentList = res.Content.Rows;
        if (this.documentList.length !== 0) {
          this.oldStr = this.documentList[0].document_content;
        }
      });
    }
  },
  methods: {
    fetchResourceList() {
      // eslint-disable-next-line
      getResourceList({
        // eslint-disable-next-line @typescript-eslint/camelcase
        resource_type_name: this.queryOptions.resourceTypeName,
        // eslint-disable-next-line @typescript-eslint/camelcase
        resource_parent_type_name: this.queryOptions.resourceParentTypeName,
        // eslint-disable-next-line @typescript-eslint/camelcase
        resource_name: this.queryOptions.resourceName,
        page: this.queryOptions.page,
        // eslint-disable-next-line @typescript-eslint/camelcase
        page_size: this.queryOptions.pageSize
      }).then(res => {
        console.log(res);
        this.resourceList = res.Content.Rows;
      });
    },
    fetchDocumentList() {
      getDocumentList({
        // eslint-disable-next-line @typescript-eslint/camelcase
        document_db_name: this.queryDocumentOptions.DocumentDBName,
        // eslint-disable-next-line @typescript-eslint/camelcase
        document_table_name: this.queryDocumentOptions.DocumentTableName,
        // eslint-disable-next-line @typescript-eslint/camelcase
        document_version: this.queryDocumentOptions.DocumentVersion,
        // eslint-disable-next-line @typescript-eslint/camelcase
        resource_id: this.queryDocumentOptions.reourceID,
        page: this.queryDocumentOptions.page,
        // eslint-disable-next-line @typescript-eslint/camelcase
        page_size: this.queryDocumentOptions.pageSize
      }).then(res => {
        console.log("test", res);
        this.documentList = res.Content.Rows;
        this.oldStr = this.documentList[0].document_content;
      });
    },
    fetchDocumentVersionList() {
      getDocumentVersionList({
        // eslint-disable-next-line @typescript-eslint/camelcase
        resource_id: this.queryVersionOptions.reourceID,
        version: this.queryVersionOptions.Version,
        page: this.queryVersionOptions.page,
        // eslint-disable-next-line @typescript-eslint/camelcase
        page_size: this.queryVersionOptions.pageSize
      }).then(res => {
        console.log("test", res);
        this.versionList = res.Content.Rows;
      });
    },
    onChange(value) {
      console.log("resouce_id", value);
      this.queryVersionOptions.reourceID = value;
      this.fetchDocumentVersionList();
    },
    onVersionChange(value) {
      console.log("onVersionChange version_id", value);
      this.DocumentVersion = value;
      this.queryDocumentOptions.DocumentVersion = value;
      this.fetchDocumentList();
    },
    onTableChange(value) {
      this.queryDocumentOptions.DocumentVersion = this.DocumentVersion;
      this.queryDocumentOptions.DocumentTableName = value;
      this.fetchDocumentList();
    }
  },
  created() {
    this.fetchResourceList();
  }
};
</script>

<style lang="scss" scoped></style>
