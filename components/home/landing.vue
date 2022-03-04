<template lang="html">
  <div ref="landing">

    <container first class="relative h-2/3 md:h-1/2 overflow-hidden">
        <div class="absolute inset-0 bg-cover bg-top" :style="{backgroundImage: `url(${data.landing_image.url})`}"/>
    </container>

    <container innerTop noTop>
      <div class="relative py-40">
        <div class="landing-title text-pink text-80 sm:text-90 tracking-tight">
          <h1 v-for="item in data.title" v-html="item.text" class="leading-08 font-header uppercase font-bold"/>
        </div>

        <div class="mt-20 font-medium">
          <h3 v-for="line in message" v-html="line" class="landing-message"/>
        </div>

        <div class="absolute inset-0 z-back">
          <icon ball class="ml-auto h-full fill-lime" ref="ball" />
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

    this.anim = gsap.to(this.$refs.ball.$el, 1, {
      rotation: 90,
      ease: "none",
      scrollTrigger: {
        trigger: this.$refs.ball.$el,
        start: "top bottom",
        scrub: true,
      },
    });

  },
  computed:{
    message(){
      let message = []
      this.data.message.forEach(item =>{
        item.text.split('\n').forEach(line => message.push(line))
      })
      return message
    }
  }
}
</script>
