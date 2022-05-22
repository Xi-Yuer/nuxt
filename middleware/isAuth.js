// 验证用户是否登录的中间件

// 谁想用这个中间件就在组件中应用该中间件
// middleware: 'isAuth'
// 有点类似于路由守卫
const isAuth = ({
    store,
    redirect
}) => {
    if (!store.state.user) {
        return redirect('/login')
    }
}
export default isAuth