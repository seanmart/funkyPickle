<template lang="html">
  <section class="c-highlights o-top o-bottom" ref="container">
    <div class="o-container c-highlights--wrapper">
      <carousel :slides="data.items" loop :speed="700" :autoplay="5" :gap="10">
        <template #default="slide">
          <div class="c-slide">
            <div class="c-image" v-image:cover="slide.image.url" />
            <div class="c-card">
              <h2 v-if="slide.title" class="c-title t-header-lg" v-html="slide.title" />
              <div v-if="slide.description.length > 0" class="u-gap-top-sm c-description" v-html="$prismic.asHtml(slide.description)" />
            </div>
          </div>
        </template>
      </carousel>
    </div>
  </section>
</template>

<script>
export default {
  props: ["data"],
};
</script>

<style lang="scss">
.c-highlights {
  overflow: hidden;
  .c-carousel {
    overflow: visible;
  }
  .c-slide {
    height: 500px;
    width: 100%;
    position: relative;
    overflow: hidden;
    transition: transform 0.5s, box-shadow 0.5s;
    border-radius: 8px;
    box-shadow: 0px 3px 5px -2px rgba($blue, 0.2);
  }
  .c-image {
    @include cover;
    z-index: -1;
    transition: transform 0.5s;
    background-position: top center;
  }
  .c-card {
    @include lime-gradient;
    position: absolute;
    top: 10%;
    bottom: 10%;
    left: 0px;
    z-index: 1;
    padding: $space;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    max-width: 40rem;
    transition-duration: 0.8s;
    transition-property: transform opacity;
    transition-timing-function: cubic-bezier(0.22, 0.55, 0.46, 1.01);
    opacity: 0;
    transform: scale(0.9);
    transform-origin: left center;
  }
  .swiper-slide-next {
    .c-card {
      transition: none;
    }
  }
  .swiper-slide-prev,
  .swiper-slide-active {
    .c-card {
      transform: scale(1);
      opacity: 1;
    }
    .c-image {
      transform: scale(1.2);
      transition: transform 1s;
    }
  }
  .swiper-slide-active {
    .c-slide {
      box-shadow: 0px 30px 10px -15px rgba($blue, 0.3);
    }
  }
}
</style>
