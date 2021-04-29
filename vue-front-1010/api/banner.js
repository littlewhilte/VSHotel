import request from '@/utils/request'
export default{
        //查询banner
    getListBanner(){
        return request({
            url:`cms/bannerfront/getAllBanner`,
            method: 'get'
        })
    }
}