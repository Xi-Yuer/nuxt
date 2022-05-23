<!--  -->
<template>
    <div class="settings-page">
        <div class="container page">
            <div class="row">

                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">更新资料</h1>

                    <div>
                        <fieldset>
                            <fieldset class="form-group">
                                <input class="form-control" type="text" placeholder="URL of profile picture"
                                    v-model="updateUser.image">
                            </fieldset>
                            <fieldset class="form-group">
                                <input class="form-control form-control-lg" type="text" placeholder="Your Name"
                                    v-model="updateUser.username">
                            </fieldset>
                            <fieldset class="form-group">
                                <textarea class="form-control form-control-lg" rows="8"
                                    placeholder="Short bio about you" v-model="updateUser.bio">
                                </textarea>
                            </fieldset>
                            <fieldset class="form-group">
                                <input class="form-control form-control-lg" type="Email" placeholder="Email"
                                    v-model="updateUser.email">
                            </fieldset>
                            <fieldset class="form-group">
                                <input class="form-control form-control-lg" type="password" placeholder="Password"
                                    v-model="updateUser.password">
                            </fieldset>
                            <button class="btn btn-lg btn-primary pull-xs-right" @click="onSubmit">
                                更新
                            </button>
                        </fieldset>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { updateUser } from '@/api/user'
export default {
    name: 'setting',
    middleware: 'isAuth',
    data() {
        return {
            updateUser: {}
        }
    },
    computed: {
        ...mapState(['user'])
    },
    mounted() {
        this.updateUser = { ...this.user, password: '' }
    },
    methods: {
        // 修改资料
        async onSubmit() {
            await updateUser(this.updateUser)
            this.$router.push(`/profile/${this.user.username}`)
        }
    }

}

</script>
<style lang='css' scoped>
</style>