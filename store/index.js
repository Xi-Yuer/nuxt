// 因为在服务端运行的是同一个实例
// 为了防止数据冲突，需要将 state 定义为一个函数
export const state = () => {
    return {
        // 用户的登录状态
        user: null
    }
}

// 同步修改
export const mutations = {
    // 修改状态的mutation
    setUser(state, payload) {
        state.user = payload
    }
}

// 服务端加载这个模块，用于解析 cookie
const cookieparser = process.server ? require('cookieparser') : undefined
// 异步提交
export const actions = {
    // 这个 action 会在实例初始化时执行
    nuxtServerInit({ commit },{ req }){
        let user = null
        if(req.headers.cookie){
            const parsed = cookieparser.parse(req.headers.cookie)
            try {
                // 解析请求体中用户信息状态
                user = JSON.parse(parsed.user)
            } catch (error) {
                console.log('err');
            }
            commit('setUser',user)
        }
    }
}