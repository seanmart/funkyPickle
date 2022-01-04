<template lang="html">
  <div ref="carousel" class="c-carousel swiper">
    <div class="c-carousel--wrapper swiper-wrapper">
      <template v-for="(slide,i) in slides">
        <div class="c-carousel-slide swiper-slide" :key="i">
          <slot v-bind="slide"/>
        </div>
      </template>
    </div>
    <div class="c-carousel-dots"/>
  </div>
</template>

<script>
export default {
  props:{
    slides: {type:Array,default:()=>([])},
    next: {type:String, default: null},
    prev: {type:String, default: null},
    loop:{type:Boolean,default:false},
    autoplay:{type:Number,default:0},
    speed:{type: Number,default:400},
  },
  mounted(){
    let options = {
      longSwipesRatio: .15,
      speed: this.speed,
      pagination:{
        el: '.c-carousel-dots',
        clickable: true,
        type: 'bullets'
      }
    }

    this.loop && (
      options.loop = this.loop,
      options.loopedSlides = 2
    )

    this.autoplay && (
      options.autoplay = {
        delay: this.autoplay < 1000 ? this.autoplay * 1000 : this.autoplay,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }
    )

    let swiper = new Swiper(this.$refs.carousel,options)
  }
}
</script>

<style lang="scss">
.c-carousel{
  .c-carousel--wrapper{
    height:100%;
    display: flex;
    flex-direction: row;
  }
  .c-carousel-slide{
    flex: 0 0 auto;
    height:100%;
    width:100%;
  }
  .c-carousel-dots{
    margin-top: 3rem;
  }
}
</style>
