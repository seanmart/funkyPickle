<template lang="html">
  <container v-if="data" noRight noLeft class="press-list relative overflow-hidden" ref="container">

    <div class="gutter-left gutter-right">
      <section-title :value="data.primary.title"/>
    </div>

    <div class="swiper gutter-left gutter-right relative z-10" ref="swiper">
      <div class="swiper-wrapper h-auto items-stretch">
        <template v-for="item in data.items">
          <div class="press-list__item swiper-slide h-auto min-h-300 flex flex-row items-stretch">
            <a :href="item.link.url" target="_blank" class="block overflow-hidden rounded-lg shadow-bottom h-full bg-lime flex flex-col lg:flex-row items-stretch w-full">
              <div class="flex-shrink-0 flex-grow-0 overflow-hidden pb-2/3 lg:pb-0 lg:w-1/2 relative">
                <div class="press-list__image absolute inset-0 bg-cover bg-center" :style="{ backgroundImage: `url(${item.image.url})` }" />
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
      <div class="dots mt-20"/>
    </div>

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
      }
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
