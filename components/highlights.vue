<template lang="html">
  <section class="c-highlights o-top o-bottom" ref="container">
    <div class="o-container c-highlights--wrapper">

      <carousel class="c-highlights-carousel" :slides="data.items" loop :autoplay="5" :gap="10">
        <template #default="slide">
          <div class="c-slide">
            <div class="c-slide-image" v-image:cover="slide.image.url"/>
            <div class="c-slide-card">
              <h2 v-if="slide.title" class="c-slide-title t-header-lg" v-html="slide.title"/>
              <div v-if="slide.description.length > 0" class="u-gap-top-sm c-side-description" v-html="$prismic.asHtml(slide.description)"/>
            </div>
          </div>
        </template>
      </carousel>

    </div>
  </section>
</template>

<script>

export default {
  props:['data'],
  mounted(){

  }
}
</script>

<style lang="scss">
.c-highlights{
  overflow: hidden;
  .c-highlights-carousel{
    overflow: visible;
  }
  .c-slide{
    height: 500px;
    width: 100%;
    position: relative;
    overflow: hidden;
    transition: transform .5s, box-shadow .5s;
    border-radius: 8px;
  }
  .c-slide-image{
    @include cover;
    top:-200px;
    z-index: -1;
  }
  .c-slide-card{
    @include lime-gradient;
    position: absolute;
    top: 10%;
    bottom: 10%;
    left:0px;
    z-index: 1;
    padding: $space;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    max-width: 40rem;
    transition: opacity .5s;
  }
  .swiper-slide-next{
    .c-slide-card{
      opacity: 0;
    }
  }
  .swiper-slide-prev{
    .c-slide-card{
      opacity: 0;
    }
  }
  .swiper-slide-active{
    .c-slide{
      box-shadow: 0px 10px 7px rgba($blue,.2);
    }
  }
}
</style>
