<!--  -->
<template>
    <div class="article-page">

        <div class="banner">
            <div class="container">
                <h1>{{ article.title }}</h1>
                <ArticleMeta :article="article" />
            </div>
        </div>

        <div class="container page">

            <div class="row article-content">
                <div class="col-md-12" v-html="article.body"></div>
            </div>

            <hr />

            <div class="article-actions">
                <ArticleMeta :article="article" />
            </div>

            <div class="row">

                <div class="col-xs-12 col-md-8 offset-md-2">
                    <ArticleComments :slug="article.slug" />
                </div>

            </div>

        </div>

    </div>
</template>

<script>
import { getArticleDtaile } from '@/api/article'
// 解析 Markdown 
import MarkdownIt from 'markdown-it'
import ArticleMeta from './components/article-meta'
import ArticleComments from './components/article-comments'
export default {
    name: 'article',
    // 用于自定义头部（ 有利于 SEO ）
    head() {
        return {
            title: `${this.article.title} - RealWorld`,
            meta: [
                {
                    // 唯一标识，避免重复覆盖
                    hid: 'des',
                    name: 'des',
                    // 主体内容
                    content: this.article.descrtption
                }
            ]
        }
    },
    components: { ArticleMeta, ArticleComments },
    async asyncData({ params }) {
        const { article } = await getArticleDtaile(params.slug)
        const md = new MarkdownIt()
        article.body = md.render(article.body)
        return {
            article
        }
    }

}

</script>
<style lang='css' scoped>
</style>