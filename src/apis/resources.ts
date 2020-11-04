import request from "@/utils/request";

// reousce list
export function getResourceList(params: JSON) {
  return request({
    url: "api/v1/resources",
    method: "get",
    params
  });
}

// reousce type list
export function getResourceTypeList(params: JSON) {
  return request({
    url: "api/v1/resource_types",
    method: "get",
    params
  });
}

export function SaveResource(params: { resourceName: string; resourceUser: string; resourcePassword: any; resourceType: number; resourceDescription: any; resourceHostIP: any; resourcePort: number; }) {
  return request({
    url: "api/v1/resources",
    method: "post",
    data: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      resource_name: params.resourceName,
      // eslint-disable-next-line @typescript-eslint/camelcase
      resource_user: params.resourceUser,
      // eslint-disable-next-line @typescript-eslint/camelcase
      resource_password: params.resourcePassword,
      // eslint-disable-next-line @typescript-eslint/camelcase
      resource_type: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        resource_type_id: params.resourceType,
      },
      // eslint-disable-next-line @typescript-eslint/camelcase
      resource_description: params.resourceDescription,
      // eslint-disable-next-line @typescript-eslint/camelcase
      resource_host_ip: params.resourceHostIP,
      // eslint-disable-next-line @typescript-eslint/camelcase
      resource_port: params.resourcePort,
    }
  });
}