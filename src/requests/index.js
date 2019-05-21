import axios from 'axios'
import { message } from 'antd'
const isDev = process.env.NODE_ENV === 'development'

const ajax = axios.create({
    baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/177006' : ''
})

ajax.interceptors.request.use(config =>{
    config.data = Object.assign({},config.data,{
        authToken: 'skdjfi'
    })
    return config
})

ajax.interceptors.response.use(resp =>{
    if (resp.data.code === 200) {
        return resp.data.data
    } else {
        message.error(resp.data.errMsg)
    }
})

export const getArticles = (offset = 0, limited = 10) => {
    return ajax.post('/api/v1/articleList', {
        offset, 
        limited
    })
}