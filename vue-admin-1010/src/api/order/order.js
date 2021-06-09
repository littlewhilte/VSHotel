import request from '@/utils/request'
export default{
    //根据订单id在确认订单页面显示对应信息--》_oid.vue
    getOrderInfo(id){
        return request({
            url:`/adminService/order-list/getOrder/${id}`,
            method:'get'
        })
    },
    //添加订单
    addOrder(order){
        return request({
            url:`/adminService/order-list/addOrder`,
            method: 'post',
            data: order//order转换json发送
        })
    },
    //根据订单id删除订单--》list.vue
    deleteOrderId(id){
        return request({
            url:`/adminService/order-list/${id}`,
            method: 'delete',    
        })
    },
    //订单分页条件查询--》list.vue
    getOrderListPage(current,limit,orderQuery){
        return request({
            //url:'table/list'+current+"/"+limit,
            url:`/adminService/order-list/pageOrderCondition/${current}/${limit}`,
            method:'post',
            //条件对象，后端使用RequestBody获取数据
            //data 表示把对象转换为json传递到接口中
            data:orderQuery
        })
    },

    //生成订单号--》create.vue
    getOrderNo(){
        return request({
            url:`/adminService/order-list/createOrderNo`,
            method:'post',
        })
    },
    //根据手机号找到用户id--》create.vue
    getUserIdByMobile(mobile){
        return request({
            url:`/adminService/order-list/getUserIdByMobile/${mobile}`,
            method:'get'
        })
    }
}