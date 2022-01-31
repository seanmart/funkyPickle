<template lang="html">
  <section class="c-article-list">

    <template v-if="data.primary.title">
      <h2 class="c-article-list__header o-container o-space-inner t-xxl t-bold-xl" v-html="data.primary.title" />
    </template>

    <div class="c-article-list__scroller o-space-inner u-hide-scroll">
      <div class="c-scroller--wrapper o-container">

        <template v-for="article in articles">
          <nuxt-link :to="`/news/${article.uid}`" class="c-article-list__article u-marg-right-md">
            <div class="c-article__image--wrapper u-marg-bottom-md">
              <div class="c-article__image" v-image:cover="article.data.image.url"/>
            </div>
            <div class="c-article__title t-md t-bold" v-html="$prismic.asHtml(article.data.title)"/>
            <span class="c-article__date t-sm t-xs--md u-marg-top-md" v-html="formatDate(article.first_publication_date)"/>
          </nuxt-link>
        </template>

      </div>
    </div>

  </section>
</template>

<script>
import {mapState} from 'vuex'
import query from '@/assets/js/articleListQuery'
import { formatDate } from "@/assets/js/helpers";
export default {
  props: ["data"],
  async fetch(){
    if (this.$store.state.lists.articles.length == 0){
    let data = await query(this.$prismic)
    this.$store.commit('LIST',{key:'articles',data: data.results})
    }
  },
  computed: {
    ...mapState({
      articlesData: state => state.lists.articles,
    }),
    articles() {
      return this.data.primary.limit ? this.articlesData.slice(0, this.data.primary.limit) : this.articlesData;
    },
  },
  methods:{
    formatDate
  }
};
</script>

<style lang="scss">
.c-article-list{

  $article-list-dur: .75s;

  background: $black;
  color: white;
  position: relative;

  .c-article-list__header{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    padding-bottom: 0px;
    pointer-events: none;
  }

  .c-article-list__scroller{
    overflow-x: scroll;
  }

  .c-scroller--wrapper{
    padding-top: 6rem;
    display: inline-flex;
    flex-direction: row;
    align-items: stretch;
  }

  .c-article-list__article{
    flex: 0 0 auto;
    width: 30rem;
    &:last-child{
      margin-right:0px;
    }
  }

  .c-article__image--wrapper{
    overflow: hidden;
  }

  .c-article__image{
    width: 100%;
    padding-bottom: 56.25%;
    transition-property: transform;
    transition-duration: $article-list-dur;
    transform: scale(1.1);
  }

  .c-article__title{
    transition-property: color;
    transition-duration: $article-list-dur;
  }

  .c-article__date{
    display: inline-block;
    opacity: .5;
  }

}

.c-article-list .c-article-list__article:active,
.c-article-list .c-article-list__article:focus,
.is-desktop .c-article-list .c-article-list__article:hover{
  .c-article__title{
    color: $lime;
  }
  .c-article__image{
    transform: scale(1.05);
  }
}
</style>
