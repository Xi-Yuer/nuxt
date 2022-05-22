<!--  -->
<template>
    <div class="home-page">
        <!-- 头部 -->
        <div class="banner">
            <div class="container">
                <h1 class="logo-font">conduit</h1>
                <p>A place to share your knowledge.</p>
            </div>
        </div>
        <!-- 文章 -->
        <div class="container page">
            <div class="row">

                <div class="col-md-9">
                    <div class="feed-toggle">
                        <ul class="nav nav-pills outline-active">
                            <!-- 用户登录展示 Your Feed -->
                            <li class="nav-item" v-if="user">
                                <nuxt-link 
                                    class="nav-link" 
                                    :to="{name:'home',query:{tab:'your_feed'}}"
                                    :class="{active:tab === 'your_feed'}"
                                    exact>
                                    Your Feed
                                </nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link 
                                    class="nav-link"
                                    :to="{name:'home',query:{tab:'global_feed'}}"
                                    :class="{active:tab === 'global_feed'}"
                                    exact>
                                    Global Feed
                                </nuxt-link>
                            </li>
                            <!-- 当 url 中有 tag 的时候展示标签 -->
                            <li class="nav-item" v-if="tag">
                                <nuxt-link class="nav-link active" to="/">#{{tag}}</nuxt-link>
                            </li>
                        </ul>
                    </div>

                    <div class="article-preview" v-for="article in articles" :key="article.slug">
                        <div class="article-meta">
                            <nuxt-link :to="{ name: 'profile', params: { username: article.author.username } }">
                                <img :src="article.author.image" />
                            </nuxt-link>
                            <div class="info">
                                <nuxt-link :to="{ name: 'profile', params: { username: article.author.username } }"
                                    class="author">{{ article.author.username }}</nuxt-link>
                                <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
                            </div>
                            <button 
                                class="btn btn-outline-primary btn-sm pull-xs-right"
                                :class="{ active: article.favorited }"
                                :disabled="article.favoriteDiaabled"
                                @click="onFavorite(article)">
                                <i class="ion-heart"></i> {{ article.favoritesCount }}
                            </button>
                        </div>
                        <nuxt-link :to="{ name: 'article', params: { slug: article.slug } }" class="preview-link">
                            <h1>{{ article.title }}</h1>
                            <p>{{ article.description }}</p>
                            <span>Read more...</span>
                        </nuxt-link>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="sidebar">
                        <p>Popular Tags</p>

                        <div class="tag-list">
                            <nuxt-link v-for="item in tags" :key="item" class="tag-pill tag-default" :to="{
                                name: 'home',
                                query: { tab:item,tag:item }
                            }">
                                {{ item }}
                            </nuxt-link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <!-- 分页 -->
        <!-- <div class="container">
            <a :href="'/?page=' + (page - 1) + '&tag=' + $route.query.tag + '&tab=' + tab">上一页</a>
            <a :href="'/?page=' + (page + 1) + '&tag=' + $route.query.tag + '&tab=' + tab">下一页</a>
        </div> -->
    </div>
</template>

<script>
import { getArticle,getFeedArticle,addFavorite,delFavorite } from '@/api/article'
import { getTags } from '@/api/tag'
import { mapState } from 'vuex'
export default {
    name: 'home',
    // watchQuery 监听 query 参数的变化 会重新执行 asyncData 函数
    watchQuery: ['tag','tab'],

    async asyncData({ query, store }) {
        const page = Number.parseInt(query.page) || 1
        const limit = 50
        const tab = query.tab || 'global_feed'
        // 判断用户登录且 tab 为 your_feed 时， 调用不同函数
        const getArticles = store.state.user && tab === 'your_feed' ? getFeedArticle : getArticle
        const { tag } = query
        // promise.all 并发请求数据
        const result = await Promise.all([
            getArticles({ limit, tag }),
            getTags()
        ])
        const [{ articles, articlesCount }, { tags }] = result
        // 为文章添加一个属性，标志该文章是否处于点赞状态
        articles.forEach(item=>item.favoriteDiaabled = false)
        return {
            articles,
            articlesCount,
            page,
            limit,
            tag,
            tags,
            tab
        }
    },
    computed:{
        ...mapState(['user'])
    },
    methods:{
       async onFavorite(article){
            // 在网络请求完成之前禁用按钮
           article.favoriteDiaabled = true
            if(article.favorited){
                // 取消点赞
                await delFavorite(article.slug)
                article.favorited = false
                article.favoritesCount -= 1
            }else{
                // 添加点赞
                await addFavorite(article.slug)
                article.favorited = true
                article.favoritesCount += 1
            }
            // 网络完成之后启用按钮
            article.favoriteDiaabled = false
        }
    }
}

</script>
<style lang='css' scoped>
</style>