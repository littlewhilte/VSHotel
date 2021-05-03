import request from '@/utils/request'

export default{
    getPayLogListPage(current,limit,PayLogQuery){
        return request({
            //url:'table/list'+current+"/"+limit,
            url:`/adminService/payLog/pagePayLogCondition/${current}/${limit}`,
            method:'post',
            //条件对象，后端使用RequestBody获取数据
            //data 表示把对象转换为json传递到接口中
            data:PayLogQuery
        })
    },
    removeDataById(id){
        return request({
            url:`/adminService/payLog/removeDataById/`+id,
            method:'post',
        })
    }
}