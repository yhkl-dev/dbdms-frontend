import request from "@/utils/request";

// reousce list
export function getDocumentList(params: JSON) {
  return request({
    url: "api/v1/documents",
    method: "get",
    params
  });
}

// version list
export function getDocumentVersionList(params: JSON) {
    return request({
      url: "api/v1/document_versions",
      method: "get",
      params
    });
  }
  