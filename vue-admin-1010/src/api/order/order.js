import request from '@/utils/request'
export default{
    getOrderInfo(id){
        return request({
            url:`/adminService/order-list/getOrder/${id}`,
            method:'get'
        })
    },
    addOrder(order){
        return request({
            url:`/adminService/order-list/addOrder`,
            method: 'post',
            data: order//order转换json发送
        })
    },
    deleteOrderId(id){
        return request({
            url:`/adminService/order-list/${id}`,
            method: 'delete',    
        })
    },
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
    getOrderNo(){
        return request({
            url:`/adminService/order-list/createOrderNo`,
            method:'post',
        })
    },
    getUserIdBymobile(mobile){
        return request({
            url:`/adminService/order-list/getUserIdByMobile/${mobile}`,
            method:'get'
        })
    }
}