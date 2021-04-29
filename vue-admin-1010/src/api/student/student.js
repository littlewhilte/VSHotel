import request from '@/utils/request'
export default{
    //列表（天剑查询分页）
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
    deleteAdminId(id){
        return request({
            url:`/adminService/admin/${id}`,
            method: 'delete',    
        })
    },
    addStudent(student) {
        return request({
            url:`/adminService/admin/addAdmin`,
            method: 'post',
            data: student//student转换json发送
        })
    },
    getStudentInfo(id){
        return request({
            url:`/adminService/admin/getAdmin/${id}`,
            method:'get'
        })
    },
    updateStudentInfo(student){
        return request({
            url:`/adminService/admin/updateAdmin`,
            method: 'post',
            data: student//student转换json发送
        })
    }
}