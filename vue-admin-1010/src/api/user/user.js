import request from '@/utils/request'
export default{
    getUserIdBymobile(mobile){
        return request({
            url:`/userService/user/getUserIdByMobile/${mobile}`,
            method:'get'
        })
    }
}