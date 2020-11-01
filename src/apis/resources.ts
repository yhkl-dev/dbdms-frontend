import request from "@/utils/request";

// reousce list
export function getResourceList(params: JSON) {
  return request({
    url: "api/v1/resources",
    method: "get",
    params
  });
}
