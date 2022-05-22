<!--  -->
<template>
    <div class="auth-page">
        <div class="container page">
            <div class="row">

                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up' }}</h1>
                    <p class="text-xs-center">
                        <nuxt-link to="/login" v-if="!isLogin">Have an account?</nuxt-link>
                        <nuxt-link to="/register" v-if="isLogin">Need an account?</nuxt-link>
                    </p>

                    <ul class="error-messages" v-if="errMessage">
                        <li>{{ errMessage }}</li>
                    </ul>

                    <form @submit.prevent="onSubmit">
                        <fieldset class="form-group" v-if="!isLogin">
                            <input required class="form-control form-control-lg" type="text" v-model="user.username"
                                placeholder="Your Name">
                        </fieldset>
                        <fieldset class="form-group">
                            <input required type="Email" v-model="user.email" class="form-control form-control-lg"
                                placeholder="Email">
                        </fieldset>
                        <fieldset class="form-group">
                            <input required v-model="user.password" class="form-control form-control-lg" type="password"
                                placeholder="Password">
                        </fieldset>
                        <button class="btn btn-lg btn-primary pull-xs-right">
                            {{ isLogin ? 'Sign in' : 'Sign up' }}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { login, register } from '@/api/user'
// 在客户端加载该模块
const Cookie = process.client ? require('js-cookie') : undefined
export default {
    name:'Login',
    middleware: 'hasLogin',
    data() {
        return {
            user: {
                username: '',
                email: '',
                password: ''
            },
            errMessage: ''
        };
    },
    computed: {
        isLogin() {
            // 判断是登录页还是注册页
            return this.$route.path === '/login'
        }
    },
    methods: {
        async onSubmit() {
            try {
                // 登录 | 注册
                const user = this.isLogin ? await login(this.user) : await register(this.user)
                // 将登录数据状态存储到 store 中
                this.$store.commit('setUser', user.user)
                // 持久化数据( 刷新数据丢失 )
                Cookie.set('user', JSON.stringify(user.user))

                this.$router.push('/')
            } catch (err) {
                this.errMessage = err.message
            }
        }
    }

}

</script>
<style lang='css' scoped>
</style>