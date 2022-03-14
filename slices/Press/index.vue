<template>
  <Container v-if="articles.length > 0" class="press-section overflow-hidden" :id="slice.id || null">

    <Title v-if="slice.primary.title" :value="slice.primary.title" class="mb-40"/>
    <prismic-rich-text v-if="slice.primary.description" :field="slice.primary.description" class="mb-40"/>

    <div class="swiper relative z-10" ref="swiper">
      <div class="swiper-wrapper h-auto items-stretch relative">

        <template v-for="article in articles">
          <div class="press-item swiper-slide h-auto min-h-300 flex flex-row items-stretch">
            <a :href="article.link.url" target="_blank" class="block overflow-hidden rounded-lg shadow-bottom h-full bg-lime flex flex-col lg:flex-row items-stretch w-full">
              <div class="flex-shrink-0 flex-grow-0 overflow-hidden pb-2/3 lg:pb-0 lg:w-1/2 relative">
                <div class="press-image absolute inset-0 bg-cover bg-center image" :style="{ backgroundImage: `url(${article.image.url})` }" />
              </div>
              <div class="p-20 flex flex-col flex-auto text-14 lg:text-10 font-medium">
                <p v-html="formatDate(article.date,'mmmm dd, yyyy')" class="mb-05"/>
                <div class="press-title text-35 lg:text-25 font-header font-bold uppercase leading-09 flex-auto">
                  <prismic-rich-text :field="article.headline"/>
                </div>
                <i><p v-html="article.source" class="mt-20"/></i>
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

  </Container>
</template>

<script>
import {formatDate} from '@/assets/helpers'
import config from '@/tailwind.config.js'
export default {
  name: "Press",
  props: ['slice'],
  mounted() {
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
  computed:{
    articles(){
      return this.slice.items
    }
  },
  methods:{formatDate}
};
</script>

<style lang="css">

  .swiper{
    overflow: visible;
  }

  .press-title{
    transition: color .25s;
  }

  .is-desktop .press-image{
    transform: scale(1.05);
    transition: transform .25s;
  }

  .is-desktop .press-item:hover .press-title{
    color: theme('colors.pink');
  }

  .is-desktop .press-item:hover .press-image{
    transform: scale(1.01);
  }

  .press-section .prev-button button,
  .press-section .next-button button{
    transform: scale(1.001);
    transition: transform .2s, background .2s;
  }

  .press-section .prev-button:hover button,
  .press-section .next-button:hover button{
    background: theme('colors.pink');
    transform: scale(1.2);
  }

  .press-section .prev-button:active button,
  .press-section .next-button:active button{
    transform: scale(.9);
  }
</style>
