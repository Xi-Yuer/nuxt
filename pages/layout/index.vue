<!--  -->
<template>
    <div>
        <!-- 顶部导航栏 -->
        <nav class="navbar navbar-light">
            <div class="container">
                <nuxt-link class="navbar-brand" to="/">realWorld</nuxt-link>
                <ul class="nav navbar-nav pull-xs-right">
                    <li class="nav-item">
                        <nuxt-link class="nav-link" exact to="/">主页</nuxt-link>
                    </li>
                    <template v-if="user">
                        <li class="nav-item">
                            <nuxt-link class="nav-link" to="/editor"><i class="ion-compose"></i>&nbsp;发表
                            </nuxt-link>
                        </li>
                        <li class="nav-item">
                            <nuxt-link class="nav-link" to="/settings"><i class="ion-gear-a"></i>&nbsp;设置
                            </nuxt-link>
                        </li>
                        <li class="nav-item">
                            <nuxt-link 
                            :to="`/profile/${user.username}`" 
                            class="nav-link">
                                <img class="user-pic" :src="user.image" onerror="javascript:this.src='https://img0.baidu.com/it/u=2029936336,3680262465&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'">
                                {{ user.username }}
                            </nuxt-link>
                        </li>
                    </template>
                    <template v-else>
                        <li class="nav-item">
                            <nuxt-link class="nav-link" to="/login">Sign in</nuxt-link>
                        </li>
                        <li class="nav-item">
                            <nuxt-link class="nav-link" to="/register">Sign up</nuxt-link>
                        </li>
                    </template>
                </ul>
            </div>
        </nav>
        <!-- 子路由 -->
        <nuxt-child />
        <!-- 底部 -->
        <footer>
            <div class="container">
                <nuxt-link to="/" class="logo-font">realWorld</nuxt-link>
                <span class="attribution">
                    An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
                    licensed under MIT.
                </span>
            </div>
        </footer>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'LayouteIndex',
    computed: {
        ...mapState(['user'])
    }
}

</script>
<style lang='css' scoped>
</style>