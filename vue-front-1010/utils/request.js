import axios from 'axios'
import cookie from 'js-cookie'
const service =axios.create({
    baseURL:'http://localhost:9001',
    timeout:2000,
})
//③创建拦截器
service.interceptors.request.use(
    config => {
          //debugger
          if (cookie.get('hotel_token')) {
              //放到header中
            config.headers['token'] = cookie.get('hotel_token');
          }
            return config
          },
          err => {
          return Promise.reject(err);    
        }
)

export default service