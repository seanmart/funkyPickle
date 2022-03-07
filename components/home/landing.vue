<template lang="html">
  <div ref="landing">

    <container first class="relative h-2/3 overflow-hidden" ref="mediaWrapper">
        <div class="absolute inset-0" ref="media">
          <div class="relative h-full">
            <div class="absolute inset-0 bg-cover bg-top bg__image" :style="{backgroundImage: `url(${data.landing_image.url})`}"/>
          </div>
        </div>
    </container>

    <container inner noTop class="bg-white shadow-bottom overflow-hidden">
      <div class="relative py-40">

        <div class="landing-title leading-09 font-header uppercase font-bold text-black text-center sm:text-left sm:pr-30 md:pr-50">
          <prismic-rich-text :field="data.message" :htmlSerializer="htmlSerializer" />
        </div>

        <div class="absolute inset-0 flex justify-center sm:justify-end z-back">
          <icon ball class="h-full fill-lime flex-shrink-0" ref="ball" />
        </div>
      </div>
    </container>

  </div>
</template>

<script>
import {getPosition} from '@/assets/helpers'
export default {
  props:['data'],
  mounted(){

    this.anims = [
      gsap.to(this.$refs.ball.$el, 1, {
        rotation: 150,
        ease: "none",
        scrollTrigger: {
          trigger: this.$refs.ball.$el,
          start: "top bottom",
          scrub: true,
        },
      }),
      gsap.to(this.$refs.media, 1, {
        scale:1.2,
        ease: "none",
        scrollTrigger: {
          trigger: this.$refs.mediaWrapper.$el,
          start: "top top",
          end: 'bottom top',
          scrub: true,
        },
      }),
    ]

  },
  destroyed(){
    this.anims && this.anims.forEach(a => a.kill())
  },
  methods:{
    htmlSerializer(type, element, content, children){

      if(content && content.indexOf('-') > 0){
        let words = content.split(" ").map(c => c.indexOf('-') > 0 ? `<span class="whitespace-nowrap">${c}</span>`: c)
        content = words.join(" ")
      }

      switch(type){
        case 'em':
        return `<span class="text-green">${content}</span>`
        case 'strong':
        return `<span class="text-pink">${content}</span>`
        default:
        return content
      }
    }
  }
}
</script>

<style media="screen">
  .landing-title{
    font-size: 15vw
  }

  @media screen and (min-width: theme('screens.sm')){
    .landing-title{
      font-size: 4.5rem;
    }
  }

  @media screen and (min-width: theme('screens.md')){
    .landing-title{
      font-size: calc((100vw - theme('spacing.nav-side')) / 14 );
    }
  }
</style>
