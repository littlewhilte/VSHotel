import request from '@/utils/request'

export default {
  //根据信息生成订单
  createOrder(rid) {
    return request({
      url: `/adminService/order-list/createOrder/`+rid,
      method: 'post',
    })
  },
  getOrderInfo(id){
    return request({
      url: `/adminService/order-list/getOrderInfo/`+id,
      method: 'get',
    })
  }
}