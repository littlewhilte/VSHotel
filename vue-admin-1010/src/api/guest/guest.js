import request from '@/utils/request'
export default{
    //列表（添加查询分页）
    getUserListPage(current,limit,userQuery){
        return request({
            //url:'table/list'+current+"/"+limit,
            url:`/userService/user/pageUserCondition/${current}/${limit}`,
            method:'post',
            //条件对象，后端使用RequestBody获取数据
            //data 表示把对象转换为json传递到接口中
            data:userQuery
        })
    },
    deleteUserById(id){
        return request({
            url:`/userService/user/${id}`,
            method: 'delete',    
        })
    },
    addGuest(guest) {
        return request({
            url:`/userService/user/addUser`,
            method: 'post',
            data: guest//student转换json发送
        })
    },
    getGuestInfo(id){
        return request({
            url:`/userService/user/getUser/${id}`,
            method:'get'
        })
    },
    updateGuestInfo(guest){
        return request({
            url:`/userService/user/updateUser`,
            method: 'post',
            data: guest//student转换json发送
        })
    }
}