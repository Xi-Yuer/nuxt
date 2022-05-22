import { request } from '@/plugins/request'

// 获取Tag
const getTags = async () => {
    const { data } = await request({
        method: 'GET',
        url: '/tags'
    })
    return data
}

export {
    getTags
}