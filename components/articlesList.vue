<template lang="html">
  <section class="c-articles-list o-container-wide o-space-inner">

    <h2 class="t-headline o-margins">Latest News</h2>

    <div class="c-articles-list--scroller u-hide-scrollbars">

        <template v-for="article in articles">
          <nuxt-link :to="`/news/${article.uid}`" class="c-card">
            <div class="c-image--wrapper">
              <div class="c-image" v-image:cover="article.data.image.url"/>
            </div>
            <div class="c-title" v-html="$prismic.asHtml(article.data.title)"/>
            <span class="c-date" v-html="fullDate(article.first_publication_date)"/>
          </nuxt-link>
        </template>

    </div>

  </section>
</template>

<script>
import {mapState} from 'vuex'
import articlesList from '@/graphQueries/articlesList'
import { fullDate } from "@/assets/js/helpers";
export default {
  props: ["data"],
  async fetch(){
    if (this.$store.state.meta.articles.length == 0){
    let data = await articlesList(this.$prismic)
    this.$store.commit('meta',{key:'articles',data: data.results})
    }
  },
  data:()=>({
    fullDate
  }),
  computed: {
    ...mapState({
      articlesData: state => state.meta.articles,
    }),
    articles() {
      return this.data.primary.limit ? this.articlesData.slice(0, this.data.primary.limit) : this.articlesData;
    },
  },
};
</script>

<style lang="scss">
.c-articles-list {
  background: $black;
  color: white;

  .c-articles-list--scroller{
    overflow-x: scroll;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    padding: 10px 0px;
    &::after,
    &::before{
      content: '';
      flex: 0 0 $s-margin;
    }
  }

  .c-card{
    flex: 0 0 auto;
    width: 70vw;
    margin-right: 5vw;
    display: flex;
    flex-direction: column;
    &:last-child{
      margin-right: 0px;
    }
  }

  .c-image--wrapper{
    flex: 0 0 auto;
    width: 100%;
    position: relative;
    padding-bottom: 56.25%;
    overflow: hidden;
    transform: translateZ(0);
  }
  .c-image{
    @include cover;
    transition: transform .5s;
    transform: scale(1.1);
  }
  .c-title{
    margin-top: 18px;
    max-width: 60ch;
    h3{
      font-size: 18px;
      font-weight: 600;
      line-height: 1.2;
      transition: color .5s;
    }
  }
  .c-date{
    font-size: 12px;
    margin-top: 12px;
    opacity: .55;
  }

  @media screen and (min-width: $medium){

    .c-articles-list--scroller{
      &::after,
      &::before{
        content: '';
        flex: 0 0 $m-margin;
      }
    }

    .c-card{
      width: 20rem;
      margin-right: 1.5rem;
    }
    .c-title{
      margin-top: 20px;
      h3{
        font-size: 20px;
      }
    }
    .c-date{
      font-size: 13px;
      margin-top: 13px;
    }

  }

  @media screen and (min-width: $huge){

    .c-articles-list--scroller{
      &::after,
      &::before{
        content: '';
        flex: 0 0 $h-margin;
      }
    }

    .c-title h3{
      font-size: 22px;
    }
    .c-date{
      font-size: 14px;
    }

  }
}

.c-articles-list .c-card:active,
.c-articles-list .c-card:focus,
.is-desktop .c-articles-list .c-card:hover{
  .c-title{
    color: $lime;
  }
  .c-image{
    transform: scale(1.05);
  }
}
</style>
