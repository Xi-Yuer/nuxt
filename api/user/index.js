import { request } from '@/plugins/request'

// 用户登录
const login = async (user) => {
    const { data } = await request({
        method: 'POST',
        url: '/users/login',
        data:{
            user
        }
    })
    return data
}

// 用户注册
const register = async (user) => {
    const { data } = await request({
        method: 'POST',
        url: '/users',
        data:{
            user
        }
    })
    return data
}
export {
    login,
    register
}