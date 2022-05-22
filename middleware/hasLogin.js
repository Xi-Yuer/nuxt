export default ({
    store,
    redirect
}) => {
    // 当用户已经登录之后不允许访问的页面
    if (store.state.user) {
        return redirect('/')
    }
}