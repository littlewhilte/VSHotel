import request from '@/utils/request'
export default{
    //列表（添加查询分页）
    getRoomListPage(current,limit,roomQuery){
        return request({
            //url:'table/list'+current+"/"+limit,
            url:`/adminService/room/pageRoomCondition/${current}/${limit}`,
            method:'post',
            //条件对象，后端使用RequestBody获取数据
            //data 表示把对象转换为json传递到接口中
            data:roomQuery
        })
    },
    deleteRoomRid(rid){
        return request({
            url:`/adminService/room/${rid}`,
            method: 'delete',    
        })
    },
    addRoom(order) {
        return request({
            url:`/adminService/room/createRoomByAdmin`,
            method: 'post',
            data: order//student转换json发送
        })
    },
    getRoomInfo(id){
        return request({
            url:`/adminService/room/getRoom/${id}`,
            method:'get'
        })
    },
    updateRoomInfo(room){
        return request({
            url:`/adminService/room/updateRoom`,
            method: 'post',
            data: room//student转换json发送
        })
    },



    //查询单间
    getSingleRoom(current,limit,roomQuery){
        return request({
            url:`/adminService/room/findSingleRoom/${current}/${limit}`,
            method:'post',
            data: roomQuery
        })
    },
    //查询标准间
    getStandardRoom(current,limit,roomQuery){
        return request({
            url:`/adminService/room/findStandardRoom/${current}/${limit}`,
            method:'post',
            data: roomQuery
        })
    },
    //查豪华间
    getRichRoom(current,limit,roomQuery){
        return request({
            url:`/adminService/room/findRichRoom/${current}/${limit}`,
            method:'post',
            data: roomQuery
        })
    },
    //查商务间
    getBusyRoom(current,limit,roomQuery){
        return request({
            url:`/adminService/room/findBusyRoom/${current}/${limit}`,
            method:'post',
            data: roomQuery
        })
    },
    //查行政间
    getPolicyRoom(current,limit,roomQuery){
        return request({
            url:`/adminService/room/findPolicyRoom/${current}/${limit}`,
            method:'post',
            data: roomQuery
        })
    },
    //查套间
    getMultRoom(current,limit,roomQuery){
        return request({
            url:`/adminService/room/findMultRoom/${current}/${limit}`,
            method:'post',
            data: roomQuery
        })
    }
}