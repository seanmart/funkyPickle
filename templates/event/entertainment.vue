<template lang="html">
  <div class="relative overflow-hidden w-full h-400 xl:h-300">
    <div class="swiper absolute inset-0 flex flex-col" ref="swiper">
      <div class="swiper-wrapper flex-auto">
        <template v-for="item in this.data.items">
          <div class="swiper-slide bg-lime rounded-lg overflow-hidden flex flex-col-reverse xl:flex-row">
            <div class="p-20 flex-auto xl:w-1/2">
              <h3 v-html="$prismic.asHtml(item.title)" class="text-35 lg:text-25 font-header font-bold uppercase leading-09"/>
              <p v-html="$prismic.asHtml(item.description)" class="mt-20 xl:text-12"/>
            </div>
            <div class="flex-auto bg-black xl:w-1/2 bg-cover" :style="{backgroundImage:`url(${item.image.url})`}"/>
          </div>
        </template>
      </div>
      <div class="flex-initial dots mt-20 text-center"/>
    </div>
  </div>
</template>

<script>
import config from '@/tailwind.config.js'
export default {
  props:['data'],
  mounted(){
    let xl = parseInt(config.theme.screens.lg)
    this.swiper = new Swiper(this.$refs.swiper, {
      slidesPerView: 1,
      spaceBetween:10,
      longSwipesRatio: .1,
      pagination: {
        el: '.dots',
        type: 'bullets',
        clickable:true
      }
    });
  },
  destroyed() {
    this.swiper && this.swiper.destroy(true, true);
  }
}
</script>
