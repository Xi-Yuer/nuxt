import axios from 'axios'
export const request = axios.create({
    baseURL: 'https://api.realworld.io/api',
    timeout: 10000
})

// 通过插件获取到上下文对象
// { query, params, req, res, app, store }
// 插件导出必须作为默认导出成员
export default ({ store }) => {
    request.interceptors.request.use((config) => {
            const token = store.state.user?.token
            if(token){
                config.headers.Authorization = `Token ${token}`
            }
            return config
        },
        (err) => {
            return Promise.reject(err)
        }
    )
}