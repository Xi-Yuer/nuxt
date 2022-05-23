<!--  -->
<template>
    <div class="editor-page">
        <div class="container page">
            <div class="row">

                <div class="col-md-10 offset-md-1 col-xs-12">
                    <div>
                        <fieldset>
                            <fieldset class="form-group">
                                <input type="text" class="form-control form-control-lg" placeholder="Article Title" v-model="article.title">
                            </fieldset>
                            <fieldset class="form-group">
                                <input type="text" class="form-control" placeholder="What's this article about?" v-model="article.description">
                            </fieldset>
                            <fieldset class="form-group">
                                <textarea class="form-control" rows="8"
                                          placeholder="Write your article (in markdown)"
                                          v-model="article.body"
                                          >
                                </textarea>
                            </fieldset>
                            <fieldset class="form-group">
                                <input type="text" class="form-control" placeholder="Enter tags" @keydown.enter="pushTag">
                                <div class="tag-list">
                                   <span v-for="tag in article.tagList" class="tag-default tag-pill">
                                       {{tag}}
                                    </span>
                                </div>
                            </fieldset>
                            <button class="btn btn-lg pull-xs-right btn-primary" type="button" @click="onSubmit">
                                Publish Article
                            </button>
                        </fieldset>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { sendArticle } from '@/api/article'
import { mapState } from 'vuex'
export default {
    name:'Editor',
    // 多个中间件就放在数组中
    middleware: 'isAuth',
    data() {
        return {
            article:{
                title:'',
                description:'',
                body:'',
                tagList:[]
            }
        };
    },
    computed:{
        ...mapState(['user'])
    },
    methods:{
        // 添加tag
        pushTag(e){
            const tag = e.target.value
            this.article.tagList.push(tag)
            e.target.value = ''
        },
        // 发表文章
        async onSubmit(){
            try {
                await sendArticle(this.article)
                this.$router.push(`/profile/${this.user.username}`)
            } catch (error) {
                window.alert(error)
            }
        }
    }

}

</script>
<style lang='css' scoped>
</style>