<!--  -->
<template>
    <div>
        <div>
            <div class="card comment-form">
                <div class="card-block">
                    <textarea class="form-control" placeholder="Write a comment..." rows="3"
                        v-model="Message"></textarea>
                </div>
                <div class="card-footer">
                    <img :src="user.image" class="comment-author-img" onerror="javascript:this.src='https://img0.baidu.com/it/u=2029936336,3680262465&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'" />&nbsp;
                    <nuxt-link :to="{ name: 'profile', params: { username: user.username } }" class="comment-author">
                        {{ user.username }}
                    </nuxt-link>
                    <button class="btn btn-sm btn-primary" @click="sendMessage">
                        发表评论
                    </button>
                </div>
            </div>

            <div class="card" v-for="(comment,index) in comments" :key="comment.id">
                <div class="card-block">
                    <p class="card-text">{{ comment.body }}</p>
                </div>
                <div class="card-footer">
                    <img :src="comment.author.image" class="comment-author-img" onerror="javascript:this.src='https://img0.baidu.com/it/u=2029936336,3680262465&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'" />&nbsp;
                    <nuxt-link :to="{ name: 'profile', params: { username: comment.author.username } }"
                        class="comment-author">
                        {{ comment.author.username }}
                    </nuxt-link>
                    <span class="date-posted">{{ comment.createAt | date('MMM DD, YYYY') }}</span>
                    <span class="mod-options" v-if="user.username === comment.author.username" @click="delComment(comment,index)">
                        <i class="ion-trash-a">delete</i>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getArticleComment, sendComment, delComment } from '@/api/article'
import { mapState } from 'vuex'
export default {
    props: {
        slug: {
            type: String,
            require: true
        }
    },
    data() {
        return {
            comments: [],
            Message: ''
        }
    },
    methods: {
        // 发表评论
        async sendMessage() {
            if (!this.Message) return
            const { comment } = await sendComment(this.slug, this.Message)
            if (comment) {
                this.comments.unshift(comment)
                this.Message = ''
            }
        },
        // 删除评论
        async delComment(comment,index) {
            await delComment(this.slug,comment.id)
            this.comments.splice(index,1)
        }
    },
    computed: {
        ...mapState(['user'])
    },
    async mounted() {
        const { comments } = await getArticleComment(this.slug)
        this.comments = comments
    }

}

</script>
<style lang='css' scoped>
</style>