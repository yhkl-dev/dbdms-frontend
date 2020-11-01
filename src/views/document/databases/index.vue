<template>
  <div style="width:100%; margin-left: 5px">
    <div style="width:100%">
      database list
      <div v-for="resource in resourceList" :key="resource.resource_id">
        {{ resource.resource_name + "@" + resource.resource_host_ip }}
      </div>
    </div>
  </div>
</template>

<script>
import { getResourceList } from "@/apis/resources";
export default {
  name: "document",
  data() {
    return {
      resourceParentTypeName: "Database", // db type
      resourceList: []
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
    }
  },
  created() {
    this.fetchResourceList();
  }
};
</script>
