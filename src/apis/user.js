import request from '@/utils/request'

// user login
export function login (username, password) {
  return request({
    url: 'login',
    method: 'post',
    data: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      user_name: username,
      // eslint-disable-next-line @typescript-eslint/camelcase
      user_password: password
    }
  })
}

// user list
export function getUserList (params) {
  return request({
    url: 'api/v1/users/',
    method: 'get',
    params
  })
}
