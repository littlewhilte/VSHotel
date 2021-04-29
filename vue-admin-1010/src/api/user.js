import request from '@/utils/request'

export function list(username, password) {
  return request({
    url: '/stuService/student/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
