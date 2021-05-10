import request from '@/utils/request'

export default {
  //根据信息生成订单
  createOrder(id) {
    return request({
      url: `/adminService/order-list/createOrder/`+id,
      method: 'post',
    })
  },
  getOrderInfo(id){
    return request({
      url: `/adminService/order-list/getOrderInfo/`+id,
      method: 'get',
    })
  },
  createNative(orderNo){
    return request({
      url: `/adminService/payLog/createNative/`+orderNo,
      method: 'get',
    })
  },
  queryOrderStatus(orderNo){
    return request({
      url: `/adminService/payLog/queryPayStatus/`+orderNo,
      method: 'get',
    })
  },
  getTypeByRid(rid){
    return request({
      url: `/adminService/room/getRoomTypeByRid/`+rid,
      method: 'get',
    })
  }
}