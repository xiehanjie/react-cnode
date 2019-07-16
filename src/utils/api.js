import axios from 'axios'
import qs from 'qs'
import { Modal } from 'antd-mobile'
const instance = axios.create({
    baseURL: 'https://cnodejs.org/api/v1/',
    timeout: 1000 * 12,
    headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
})

// 响应拦截器
axios.interceptors.response.use(
    response => response.status === 200 ? Promise.resolve(response) : Promise.reject(response), 
    error => {
        const { response } = error
        if(response) {
            if(response.status) {

            }
            return Promise.reject(error.response)
        } else {
            Modal.alert(
                '提升', '请求已超时', [
                    { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
                    { text: '刷新', onPress: () => window.location.reload() }
                ]
            )
        }
        if(error.response.status) {
            switch (error.response.status) {
                // 401 未登录，跳转登录
                // 403 token过期，清除本地和store的token，跳转登录
                // 404请求不存在
                // 其他直接error.response.data.message
            }
            
        }
    }
)

export default instance