<template lang="html">
  <section class="highlights" ref="container">
    <div class="highlights--wrapper block">
      <div class="highlights-carousel--wrapper" ref="carousel">

        <carousel class="highlights-carousel" :slides="data.items" loop :autoplay="5000" :speed="500">
          <template #default="slide">
            <template v-if="slide.link.slug">
              <nuxt-link class="link" :to="`/${slide.link.slug}`"/>
            </template>

            <div class="content--wrapper" v-if="slide.title || slide.description.length > 0">
              <div class="content">

                <template v-if="slide.link.slug">
                  <icon class="arrow" arrow/>
                </template>

                <template v-if="slide.title">
                  <h3 class="title title--rg" v-html="slide.title"/>
                </template>

                <template v-if="slide.description.length > 0">
                  <div class="description text--rg" v-html="$prismic.asHtml(slide.description)"/>
                </template>

              </div>
            </div>

            <div v-if="slide.image.url" class="image--wrapper">
              <div class="image" v-image:cover="slide.image.url" />
            </div>

            <div class="image--wrapper">
              <div class="image" v-image:cover="slide.image.url"/>
            </div>

          </template>
        </carousel>

      </div>
    </div>
  </section>
</template>

<script>
import {uid} from '../assets/js/helpers'
export default {
  props:{
    data:Object
  },
  data:()=>({
    id:null
  }),
  mounted(){
    this.id = uid()
    this.$nextTick(()=>{
      let imgs = this.$refs.container.querySelectorAll('.image')
      gsap.to(imgs,1,{y:200,ease:'none',scrollTrigger:{
        id: this.id,
        trigger:this.$refs.container,
        start: 'top bottom',
        scrub: true
      }})
    })

  },
  destroyed(){
    ScrollTrigger.getById(this.id).kill()
  }
}
</script>

<style lang="scss">
.highlights{
  overflow: hidden;

  .highlights-carousel{
    height: 45rem;
  }

  .image--wrapper{
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    z-index: -1;
    overflow: hidden;

    .image{
      position:absolute;
      top: -200px;
      left: 0px;
      bottom: 0px;
      right: 0px;
    }
  }

  .link{
    display: block;
    position: absolute;
    top:0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    z-index: 1;
  }

  .content--wrapper{
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    display: flex;
    align-items: center;
  }

  .content{
    background: $lime;
    flex: 0 0 auto;
    max-width: 40rem;
    padding: 5rem;
    position: relative;
    opacity: 0;
    transition: opacity .25s;

    .arrow{
      display: block;
      position: absolute;
      top: 2rem;
      right: 2rem;
      width: 3rem;
    }

    .title{
      text-transform: uppercase;
      margin-bottom: 2rem;
    }

    .description{
      max-width: 90ch;
    }
  }

  .swiper-slide-active .slide--wrapper .content,
  .swiper-slide-duplicate-active .slide--wrapper .content{
    opacity: 1;
  }
}
</style>
