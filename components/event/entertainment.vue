<template lang="html">
  <div class="relative overflow-hidden w-full h-400 xl:h-300">
    <div class="swiper absolute inset-0 flex flex-col" ref="swiper">
      <div class="swiper-wrapper flex-auto">
        <template v-for="item in this.data.items">

          <container-widget full
            class="swiper-slide bg-lime flex flex-col-reverse xl:flex-row"
            :style="{background:colors.primary}"
            >
            <div class="p-20 flex-initial xl:w-1/2 text-white">
              <prismic-rich-text :field="item.title" class="text-35 md:text-30 font-header font-bold uppercase leading-09" />
              <prismic-rich-text :field="item.description" class="mt-20 xl:text-12" />
            </div>
            <div class="flex-auto bg-black xl:w-1/2 bg-cover image" :style="{backgroundImage:`url(${item.image.url})`}"/>
          </container-widget>

        </template>
      </div>
      <div class="flex-initial dots mt-20 text-center"/>
    </div>
  </div>
</template>

<script>
import config from '@/tailwind.config.js'
export default {
  props:{
    data: Object,
    colors: Object
  },
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
