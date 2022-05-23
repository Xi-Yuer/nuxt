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
// 用户资料更新
const updateUser = async (user) => {
    const { data } = await request({
        method: 'PUT',
        url: '/user',
        data:{
            user
        }
    })
    return data
}
// 关注用户
const followUser = async (method = 'POST', username) => {
    const { data } = await request({
        method: method,
        url: `/profiles/${username}/follow`
    })
    return data
}
// 获取用户资料
const getUserDetail = async (username) => {
    const { data } = await request({
        method: 'GET',
        url: `/profiles/${username}`
    })
    return data
}
export {
    login,
    register,
    followUser,
    updateUser,
    getUserDetail
}