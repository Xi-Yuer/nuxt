module.exports = {
    // 重写路由规则
    router: {
        // 当 nuxt-link 匹配当的路由会自动添加一个类名 active , 默认添加的类名是 'nuxt-link-active'
        // linkActiveClass: 'active', 模糊匹配 会匹配到 / 路径
        linkExactActiveClass: 'active', //精确匹配
        // 自定义路由表规则
        extendRoutes(routes, resolve) {
            // 清除 nuxt 默认生成的路由表， 使用我们自定义的路由表
            routes.splice(0) // 清除路由表
            // 添加自己的路由表
            routes.push(...[{
                path: '/',
                component: resolve(__dirname, 'pages/layout'),
                children: [{
                        path: '', // 默认子路由
                        name: 'home',
                        component: resolve(__dirname, 'pages/home')
                    },
                    {
                        path: '/login', // 登录
                        name: 'login',
                        component: resolve(__dirname, 'pages/login')
                    },
                    {
                        path: '/register', // 注册
                        name: 'register',
                        component: resolve(__dirname, 'pages/login')
                    },
                    {
                        path: '/profile/:username', // 用户资料页
                        name: 'profile',
                        component: resolve(__dirname, 'pages/profile')
                    },
                    {
                        path: '/settings', // 设置
                        name: 'settings',
                        component: resolve(__dirname, 'pages/setting')
                    },
                    {
                        path: '/editor',
                        name: 'editor',
                        component: resolve(__dirname, 'pages/editor')
                    },
                    {
                        path: '/article/:slug',
                        name: 'article',
                        component: resolve(__dirname, 'pages/article')
                    },
                ]
            }, ])
        }
    },
    // 注册插件
    plugins:[
        '~/plugins/request/index.js',
        '~/plugins/format/index.js'
    ],
    // 服务器
    server:{
        // 服务器中配置
        host:'0.0.0.0',
        port:8888
    }
}