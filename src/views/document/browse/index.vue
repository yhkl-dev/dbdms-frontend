<template>
  <div class="browse">
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
    <div class="doc-content">
      <div class="document-content" v-if="documentList.length !== 0">
        <div v-for="document in documentList" :key="document.document_id">
          <a-divider orientation="left">{{
            "Database Name: " +
              document.document_db_name +
              " Version: " +
              document.document_version
          }}</a-divider>
          <div class="markdown-body markdown-style">
            <VueMarkdown :source="document.document_content"></VueMarkdown>
          </div>
        </div>
      </div>
      <div style="width: 90%; justify-content: center" v-else>
        <a-empty :description="false" />
      </div>
    </div>
  </div>
</template>

<script>
import { getResourceList } from "@/apis/resources";
import { getDocumentList, getDocumentVersionList } from "@/apis/documents";
import VueMarkdown from "vue-markdown";

export default {
  components: {
    VueMarkdown
  },
  data() {
    return {
      reourceName: "",
      DocumentVersion: "",

      resourceList: [],
      documentList: [],
      versionList: [],
      documentTableList: [],
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
      }
    };
  },
  watch: {
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
        this.documentList = res.Content.Rows;
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

<style lang="scss" scoped>
.browse {
  width: 90%;
  margin: 20px;
}
.document-content {
  text-justify: inherit;
}
.doc-content {
  max-width: 980px;
}
.markdown-style {
  max-width: 980px !important;
}
</style>
