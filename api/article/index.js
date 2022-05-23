import { request } from '@/plugins/request'

// 获取公共文章列表
const getArticle = async (params) => {
    const { data } = await request({
        method: 'GET',
        url: '/articles',
        params
    })
    return data
}
// 获取关注用户文章列表
const getFeedArticle = async (params) => {
    const { data } = await request({
        method: 'GET',
        url: '/articles/feed',
        params
    })
    return data
}
// 添加点赞
const addFavorite = async (slug) => {
    const { data } = await request({
        method: 'POST',
        url: `/articles/${slug}/favorite`,
    })
    return data
}
// 移除点赞
const delFavorite = async (slug) => {
    const { data } = await request({
        method: 'DELETE',
        url: `/articles/${slug}/favorite`,
    })
    return data
}
// 获取文章详情
const getArticleDtaile = async (slug) => {
    const { data } = await request({
        method: 'GET',
        url: `/articles/${slug}`,
    })
    return data
}
// 获取文章评论详情
const getArticleComment = async (slug) => {
    const { data } = await request({
        method: 'GET',
        url: `/articles/${slug}/comments`,
    })
    return data
}
// 发表评论
const sendComment = async (slug,comment) => {
    const { data } = await request({
        method: 'POST',
        url: `/articles/${slug}/comments`,
        data:{
            comment:{
                body:comment
            }
        }
    })
    return data
}
// 删除评论
const delComment = async (slug,id) => {
    const { data } = await request({
        method: 'DELETE',
        url: `/articles/${slug}/comments/${id}`
    })
    return data
}
// 发表文章
const sendArticle = async (article) => {
    const { data } = await request({
        method: 'POST',
        url: `/articles`,
        data:{
            article
        }
    })
    return data
}

export {
    getArticle,
    getFeedArticle,
    addFavorite,
    delFavorite,
    getArticleDtaile,
    getArticleComment,
    sendComment,
    delComment,
    sendArticle
}