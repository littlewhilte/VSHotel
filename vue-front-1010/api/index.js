import request from '@/utils/request'
export default{
    //获取主页面数据（景点）
    getIndexData(){
        return request({
            url:`adminservice/indexfront/index`,
            method: 'get'
        })
    }
}