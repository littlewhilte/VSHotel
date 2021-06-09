import request from '@/utils/request'

export default {
  //条件分页课程查询的方法
  getRoomList(page,limit,searchObj) {
    return request({
      url: `/adminService/subject/pageRoomCondition/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
  //查询所有分类的方法01
  getAllSubject() {
    return request({
      url: '/adminService/subject/getSubject',
      method: 'get'
    })
  },

  //课程详情的方法
  getRoomInfo(id) {
    return request({
      url: '/adminService/admin/front/getRoomFrontInfo/'+id,
      method: 'get'
    })
  },

  getRoomByType(page,limit,type){
      return request({
          url:`/adminService/subject/getRoomByType/${page}/${limit}`,
          method:'post',
          data: type
      })
  },
  getRoom(type){
    return request({
      url:`/adminService/room/getRoom/${type}`,
      method:'get'
    })
  }

}