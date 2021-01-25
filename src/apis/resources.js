import request from '@/utils/request'

// resource list
export function getResourceList (params) {
  return request({
    url: 'api/v1/resources',
    method: 'get',
    params
  })
}

// add resource
export function addResource (params) {
  return request({
    url: 'api/v1/resources',
    method: 'post',
    data: params
  })
}

// update resource
export function updateResource (id, data) {
  return request({
    url: 'api/v1/resources/' + id,
    method: 'PUT',
    data
  })
}

// add resource
export function deleteResource (id) {
  return request({
    url: 'api/v1/resources/' + id,
    method: 'DELETE'
  })
}

// get resource type list
export function getResourceTypeList (params) {
  return request({
    url: 'api/v1/resource_types',
    method: 'get',
    params
  })
}

// test database connection
export function testDBConnection (params) {
  return request({
    url: 'api/v1/test_connection',
    method: 'post',
    data: params
  })
}
