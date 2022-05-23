<!--  -->
<template>
    <div class="article-meta">
        <nuxt-link :to="{ name: 'profile', params: { username: article.author.username } }">
            <img :src="article.author.image" onerror="javascript:this.src='https://img0.baidu.com/it/u=2029936336,3680262465&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'" />
        </nuxt-link>
        <div class="info">
            <nuxt-link :to="{ name: 'profile', params: { username: article.author.username } }" class="author">
                {{ article.author.username }}
            </nuxt-link>
            <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
        </div>
        <button 
            class="btn btn-sm btn-outline-secondary" 
            :class="{ active: article.author.following }"
            @click="onFollow">
            <i class="ion-plus-round"></i>
            &nbsp;
            Follow {{article.author.username}} <span class="counter"></span>
        </button>
        &nbsp;&nbsp;
        <button 
            class="btn btn-sm btn-outline-primary" 
            :class="{ active: article.favorited }"
            @click="onFavorite">
            <i class="ion-heart"></i>
            &nbsp;
            Favorite Post <span class="counter">{{ article.favoritesCount }}</span>
        </button>
    </div>
</template>

<script>
import { followUser } from '@/api/user'
export default {
    props: {
        article: {
            type: Object,
            require: true
        }
    },
    methods:{
        // 关注|取消关注
        async onFollow(){
            const isFollow = this.article.author.following
            isFollow ? await followUser('POST',this.article.author.username) : await followUser('DELETE',this.article.author.username)
            this.article.author.following = !this.article.author.following
        },
        // 文章点赞
        onFavorite(){}
    }
}

</script>
<style lang='css' scoped>
</style>