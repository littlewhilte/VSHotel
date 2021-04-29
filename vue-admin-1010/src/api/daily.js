import request from '@/utils/request'

export default{
    showChart(searchObj) {
        return request({
            url: `/staService/statistics/show-chart/${searchObj.begin}/${searchObj.end}/${searchObj.type}`,
            method: 'get'
        })
    }
}