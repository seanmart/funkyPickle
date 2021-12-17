<template lang="html">
  <section class="highlights">
    <div class="highlights--wrapper block">
      <div class="highlights-carousel--wrapper" ref="carousel">

        <carousel class="highlights-carousel" :slides="data.items" loop :autoplay="5000" :speed="500">
          <template #default="slide">
            <template v-if="slide.link.slug">
              <nuxt-link class="link" :to="`/${slide.link.slug}`"/>
            </template>

            <div class="content" v-if="slide.title || slide.description.length > 0">
              <div class="content--wrapper">

                <template v-if="slide.link.slug">
                  <icon class="arrow" arrow/>
                </template>

                <template v-if="slide.title">
                  <h3 class="title fnt--header" v-html="slide.title"/>
                </template>

                <template v-if="slide.description.length > 0">
                  <div class="description" v-html="$prismic.asHtml(slide.description)"/>
                </template>

              </div>
            </div>

            <div v-if="slide.image.url" class="image--wrapper">
              <div class="image" v-image:cover="slide.image.url" />
            </div>

          </template>
        </carousel>

      </div>
    </div>
  </section>
</template>

<script>
export default {
  props:{
    data:Object
  },
  mounted(){
    this.$nextTick(this.init)
  },
  methods:{
    init(){
      let imgs = this.$refs.carousel.querySelectorAll('.image')

      gsap.to(imgs,1,{y:200,ease: 'none', scrollTrigger:{
        id: 'highlights',
        trigger: this.$refs.carousel,
        start: 'top bottom',
        scrub: true,
      }})
    }
  },
  destroyed(){
    ScrollTrigger.getById('highlights').kill()
  }
}
</script>

<style lang="scss">
.highlights{
  overflow: hidden;

  .highlights-carousel{
    height: 45rem;
  }

  .image--wrapper,
  .image{
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    z-index: -1;
  }

  .image--wrapper{
    overflow: hidden;
  }

  .image{
    top: -200px;
    will-change: transform;
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

  .content{
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    display: flex;
    align-items: center;
  }

  .content--wrapper{
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
      font-size: 5rem;
      line-height: .9;
      margin-bottom: 2rem;
    }

    .description{
      max-width: 90ch;
      line-height: 1.4;
    }
  }

  .swiper-slide-active .slide--wrapper .content--wrapper,
  .swiper-slide-duplicate-active .slide--wrapper .content--wrapper{
    opacity: 1;
  }
}
</style>
