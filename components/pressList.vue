<template lang="html">
  <container noRight noLeft class="press-list relative overflow-hidden" ref="container">

    <div class="gutter-left gutter-right">
      <section-title v-if="theTitle" :value="theTitle"/>
    </div>

    <div class="swiper gutter-left gutter-right relative z-10" ref="swiper">
      <div class="swiper-wrapper h-auto items-stretch">
        <template v-for="item in pressItems">
          <div class="press-list__item swiper-slide h-auto min-h-300">
            <a :href="item.link" target="_blank" class="block overflow-hidden rounded-lg shadow-bottom h-full bg-lime flex flex-col lg:flex-row items-stretch">
              <div class="flex-shrink-0 flex-grow-0 overflow-hidden pb-2/3 lg:pb-0 lg:w-1/2 relative">
                <div class="press-list__image absolute inset-0 bg-cover bg-center" :style="{ backgroundImage: `url(${item.image.url})` }" />
              </div>
              <div class="p-20 flex flex-col flex-auto text-14 lg:text-10 font-medium">
                <p v-html="formatDate(item.date,'mmmm dd, yyyy')" class="mb-05"/>
                <h3 class="press-list__title text-35 lg:text-25 font-header font-bold uppercase leading-08 flex-auto" v-html="item.title" />
                <i><p v-html="item.source" class="mt-20"/></i>
              </div>
            </a>
          </div>
        </template>
      </div>
      <div class="dots mt-20"/>
    </div>

  </container>
</template>

<script>
import {formatDate} from '@/assets/helpers'
import config from '@/tailwind.config.js'
export default {
  props: {
    data: { type: Object, default: null },
  },
  mounted() {
    let lg = parseInt(config.theme.screens.lg)
    this.swiper = new Swiper(this.$refs.swiper, {
      slidesPerView: 1,
      spaceBetween:10,
      longSwipesRatio: .1,
      pagination: {
        el: '.dots',
        type: 'bullets',
        clickable:true,

      },
      // breakpoints:{
      //   [lg]:{
      //     slidesPerView: 2
      //   }
      // }
    });
  },
  destroyed() {
    this.swiper && this.swiper.destroy(true, true);
  },
  methods:{formatDate},
  computed: {
    theTitle() {
      return "In The Press";
    },
    pressItems() {
      return [
        {
          link: "https://www.google.com",
          image: {
            url: "https://images.prismic.io/funkypickle/ba05eeb2-422e-4026-8d91-f2e8cc5d1a2d_player1.jpg",
          },
          date: '2022-01-21',
          title: "Funkypickle is stirring up the picklebll scene",
          source: "Pickleball Monthly"
        },
        {
          link: "https://www.google.com",
          image: {
            url: "https://images.prismic.io/funkypickle/ba05eeb2-422e-4026-8d91-f2e8cc5d1a2d_player1.jpg",
          },
          date: '2021-12-21',
          title: "This new pickleball organization is making its mark",
          source: "The New York Times"
        },
        {
          link: "https://www.google.com",
          image: {
            url: "https://images.prismic.io/funkypickle/ba05eeb2-422e-4026-8d91-f2e8cc5d1a2d_player1.jpg",
          },
          date: '2021-10-21',
          title: "Five charities to lookout for this year",
          source: 'Stanford Current'
        },
        {
          link: "https://www.google.com",
          image: {
            url: "https://images.prismic.io/funkypickle/ba05eeb2-422e-4026-8d91-f2e8cc5d1a2d_player1.jpg",
          },
          date: '2021-09-05',
          title: "When it comes to pickleball, things are about to get funky",
          source: "Sevendays"
        },
      ];
    },
  },
};
</script>

<style media="screen">
  .press-list .swiper-pagination-bullet-active{
    background: theme('colors.pink');
  }

  .press-list__title{
    transition: color .25s;
  }

  .is-desktop .press-list__image{
    transform: scale(1.05);
    transition: transform .25s;
  }

  .is-desktop .press-list__item:hover .press-list__title{
    color: theme('colors.pink');
  }

  .is-desktop .press-list__item:hover .press-list__image{
    transform: scale(1.01);
  }
</style>
