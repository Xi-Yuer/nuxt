<!--  -->
<template>
    <div class="profile-page">

        <div class="user-info">
            <div class="container">
                <div class="row">

                    <div class="col-xs-12 col-md-10 offset-md-1">
                        <img :src="user.image" class="user-img" onerror="javascript:this.src='https://img0.baidu.com/it/u=2029936336,3680262465&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'" />
                        <h4>{{ user.username }}</h4>
                        <p>
                            {{ user.bio }}
                        </p>
                        <button class="btn btn-sm btn-outline-secondary action-btn">
                            <i class="ion-plus-round"></i>
                            &nbsp;
                            Follow {{ user.username }}
                        </button>
                    </div>

                </div>
            </div>
        </div>

        <div class="container">
            <div class="row">

                <div class="col-xs-12 col-md-10 offset-md-1">
                    <div class="articles-toggle">
                        <ul class="nav nav-pills outline-active">
                            <li class="nav-item">
                                <a class="nav-link active" href="">我的文章</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="">关注文章</a>
                            </li>
                        </ul>
                    </div>

                    <div class="article-preview" v-for="article in Article" :key="article.slug">
                        <div class="article-meta">
                            <nuxt-link 
                                :to="{ name: 'profile', params: { username: article.author.username } }">
                                <img :src="article.author.image" onerror="javascript:this.src='https://img0.baidu.com/it/u=2029936336,3680262465&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'" />
                            </nuxt-link>
                            <div class="info">
                                <nuxt-link 
                                    :to="{ name: 'profile', params: { username: article.author.username } }" 
                                    class="author">
                                    {{ article.author.username }}
                                </nuxt-link>
                                <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
                            </div>
                            <button class="btn btn-outline-primary btn-sm pull-xs-right">
                                <i class="ion-heart"></i> {{ article.favoritesCount }}
                            </button>
                        </div>
                       <nuxt-link 
                            :to="{ name: 'article', params: { slug: article.slug } }" 
                            class="preview-link">
                            <h1>{{ article.title }}</h1>
                            <p>{{ article.description }}</p>
                            <span>更多...</span>
                        </nuxt-link>
                    </div>

                </div>

            </div>
        </div>

    </div>
</template>

<script>
import { mapState } from 'vuex'
import { getArticle } from '@/api/article'
import { getUserDetail } from '@/api/user'
export default {
    name: 'profile',
    middleware: 'isAuth',
    data() {
        return {
            Article: [],
            username:'',
            user:{}
        };
    },
    async mounted() {
        const username = this.$route.params.username
        const { profile } = await getUserDetail(username)
        this.user = profile
        this.username = username
        const { articles } = await getArticle({ author: username })
        this.Article = articles
    }
}

</script>
<style lang='css' scoped>
</style>