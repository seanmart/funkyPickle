<template lang="html">
  <container v-if="data" class="press-list relative overflow-hidden" ref="container">

    <app-title v-if="data.primary.title" :value="data.primary.title" class="mb-space"/>

    <div class="swiper relative z-10" ref="swiper">
      <div class="swiper-wrapper h-auto items-stretch relative">
        <template v-for="item in data.items">
          <div class="press-list__item swiper-slide h-auto min-h-300 flex flex-row items-stretch">
            <a :href="item.link.url" target="_blank" class="block overflow-hidden rounded-lg shadow-bottom h-full bg-lime flex flex-col lg:flex-row items-stretch w-full">
              <div class="flex-shrink-0 flex-grow-0 overflow-hidden pb-2/3 lg:pb-0 lg:w-1/2 relative">
                <div class="press-list__image absolute inset-0 bg-cover bg-center image" :style="{ backgroundImage: `url(${item.image.url})` }" />
              </div>
              <div class="p-20 flex flex-col flex-auto text-14 lg:text-10 font-medium">
                <p v-html="formatDate(item.date,'mmmm dd, yyyy')" class="mb-05"/>
                <h3 class="press-list__title text-35 lg:text-25 font-header font-bold uppercase leading-09 flex-auto" v-html="$prismic.asText(item.headline)" />
                <i><p v-html="item.publication" class="mt-20"/></i>
              </div>
            </a>
          </div>
        </template>
      </div>
      <div class="hidden md:block prev-button absolute z-20 left-0 top-1/2 -mt-25px -ml-25px">
        <button v-html="'<'" class="h-50px w-50px rounded-full bg-black text-white flex justify-center items-center"/>
      </div>
      <div class="hidden md:block next-button absolute z-20 right-0 top-1/2 -mt-25px -mr-25px">
        <button v-html="'>'" class="h-50px w-50px rounded-full bg-black text-white flex justify-center items-center"/>
      </div>
    </div>
    <div class="dots mt-20"/>

  </container>
</template>

<script>
import {formatDate} from '@/assets/helpers'
import config from '@/tailwind.config.js'
export default {
  props:['data'],
  mounted() {
    if (!this.data) return

    this.swiper = new Swiper(this.$refs.swiper, {
      slidesPerView: 1,
      spaceBetween:10,
      longSwipesRatio: .1,
      pagination: {
        el: '.dots',
        type: 'bullets',
        clickable:true,
      },
      navigation: {
        nextEl: '.next-button',
        prevEl: '.prev-button',
      },
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

      return []
    },
  },
};
</script>

<style media="screen">

  .swiper{
    overflow: visible;
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

  .press-list .prev-button button,
  .press-list .next-button button{
    transform: scale(1.001);
    transition: transform .2s, background .2s;
  }

  .press-list .prev-button:hover button,
  .press-list .next-button:hover button{
    background: theme('colors.pink');
    transform: scale(1.2);
  }

  .press-list .prev-button:active button,
  .press-list .next-button:active button{
    transform: scale(.9);
  }
</style>
