import request from '@/utils/request'
export default{
    //列表（添加查询分页）
    getStudentListPage(current,limit,studentQuery){
        return request({
            url:`/stuService/student/pageStuCondition/${current}/${limit}`,
            method:'post',
            //条件对象，后端使用RequestBody获取数据
            //data 表示把对象转换为json传递到接口中
            data:studentQuery
        })
    },
    deleteStudentById(id){
        return request({
            url:`/stuService/student/${id}`,
            method: 'delete',    
        })
    },
    addStudent(student) {
        return request({
            url:`/stuService/student/addStudent`,
            method: 'post',
            data: student//student转换json发送
        })
    },
    getStudentInfo(id){
        return request({
            url:`/stuService/student/getStudent/${id}`,
            method:'get'
        })
    },
    updateStudentInfo(student){
        return request({
            url:`/stuService/student/updateStudent`,
            method: 'post',
            data: student//student转换json发送
        })
    }
}