import request from '@/utils/request'

export default{
    createStatisticData(day){
        return request({
            url:`/staService/statistics/registerCount`+day,
            method:'post'
        })
    },
    getDataSta(){
        return request({
            url:`/staService/statistics/show-chart/${searchObj.type}/${searchObj.begin}/${searchObj.end}`,
            method:'post'            
        })
    }
}