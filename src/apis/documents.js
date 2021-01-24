import request from '@/utils/request'

// get document list
export function getDocumentList (params) {
  return request({
    url: 'api/v1/documents',
    method: 'get',
    params
  })
}

// get document version list
export function getDocumentVersionList (params) {
  return request({
    url: 'api/v1/document_versions',
    method: 'get',
    params
  })
}

// generate documents
export function generateDocument (resouceID) {
  return request({
    url: 'api/v1/documents/resource/' + resouceID,
    method: 'get'
  })
}
