<template lang="html">
  <div ref="carousel" class="swiper" v-if="slides.length > 0">
    <div class="swiper-wrapper" :style="{height}">
      <template v-for="(slide,i) in slides">
        <div :key="i" class="swiper-slide">
          <div class="slide--wrapper">
            <slot v-bind="slide"/>
          </div>
        </div>
      </template>
    </div>
    <div class="dots"/>
  </div>
</template>

<script>
export default {
  props:{
    slides:{type:Array, default:()=>[]},
    loop:{type:Boolean,default:false},
    autoplay:{type:Number,default:0},
    speed:{type: Number,default:400},
    height:{type:String,default:'50rem'}
  },
  mounted(){
    let options = {
      longSwipesRatio: .15,
      speed: this.speed,
      pagination:{
        el: '.dots',
        type: 'bullets'
      }
    }

    this.loop && (
      options.loop = this.loop,
      options.loopedSlides = 2
    )

    this.autoplay && (
      options.autoplay = {
        delay: this.autoplay,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }
    )

    let swiper = new Swiper(this.$refs.carousel,options)
  }
}
</script>

<style lang="scss">
.swiper{
  overflow: visible;

  .slide--wrapper{
    position: relative;
    height: 100%;
    background: white;
    transform: scale(.95);
    transform-origin: top left;
    transition: transform .25s;
  }

  .swiper-slide-active .slide--wrapper,
  .swiper-slide-duplicate-active .slide--wrapper,
  .swiper-slide-prev .slide--wrapper,
  .swiper-slide-duplicate-prev .slide--wrapper{
    transform: scale(1);
  }

  .dots{
    padding-top: 2rem;
  }

  .swiper-pagination-bullet{
    background: none;
    border: 1px solid $black;
    opacity: 1;

    &.swiper-pagination-bullet-active{
      background: $black;
    }

    &:first-child{
      margin-left: 0px;
    }
  }
}
</style>
