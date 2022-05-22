<!--  -->
<template>
    <div>
        <div>
            <form class="card comment-form">
                <div class="card-block">
                    <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
                </div>
                <div class="card-footer">
                    <img :src="user.image" class="comment-author-img" />&nbsp;
                    <nuxt-link 
                        :to="{ name: 'profile', params: { username: user.username } }"
                        class="comment-author">
                    {{ user.username }}
                    </nuxt-link>
                    <button class="btn btn-sm btn-primary">
                        Post Comment
                    </button>
                </div>
            </form>

            <div class="card" v-for="comment in comments" :key="comment.id">
                <div class="card-block">
                    <p class="card-text">{{ comment.body }}</p>
                </div>
                <div class="card-footer">
                    <img :src=" comment.author.image" class="comment-author-img" />&nbsp;
                    <nuxt-link :to="{ name: 'profile', params: { username: comment.author.username } }"
                        class="comment-author">
                        {{ comment.author.username }}
                    </nuxt-link>
                    <span class="date-posted">{{ comment.createAt | date('MMM DD, YYYY') }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getArticleComment } from '@/api/article'
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
            comments: []
        }
    },
    computed:{
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