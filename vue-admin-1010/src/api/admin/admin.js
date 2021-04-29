import request from '@/utils/request'
export default{
    getAdminInfo(id){
        return request({
            url:`/adminService/admin/getAdminInfo/${id}`,
            method:'get'
        })
    },
    updateAdminInfo(admin){
        return request({
            url:`/adminService/admin/updateAdmin`,
            method: 'post',
            data: admin//student转换json发送
        })
    },
    getAdminListPage(current,limit,adminQuery){
        return request({
            //url:'table/list'+current+"/"+limit,
            url:`/adminService/admin/pageAdminCondition/${current}/${limit}`,
            method:'post',
            //条件对象，后端使用RequestBody获取数据
            //data 表示把对象转换为json传递到接口中
            data:adminQuery
        })
    },
}