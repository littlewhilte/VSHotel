import request from '@/utils/request'

export default {
  //根据信息生成订单
  createOrder(order) {
    return request({
      url: `/adminService/order-list/addOrder/`,
      method: 'post',
      data: order
    })
  }
}