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
// 获取文章列表
export const getArticles = (offset = 0, limited = 10) => {
    return ajax.post('/api/v1/articleList', {
        offset, 
        limited
    })
}

// 通过id删除某篇文章
export const deleteArticle = (id) => {
    return ajax.post(`/api/v1/articleDelete/${id}`)
}

// 通过id编辑某篇文章
export const editArticle = (id) => {
    return ajax.post(`/api/v1/getOneArticle/${id}`)
}

// 保存当前id文章
export const saveArticle = (id,data) => {
    return ajax.post(`/api/v1/saveArticle/${id}`,data)
}

// 获取最近几月的数量
export const amountArticle = () => {
    return ajax.post('/api/v1/getChart')
}

// 获取通知列表信息
export const amountNotifications = () => {
    return ajax.post('api/v1/getNotifications')
}