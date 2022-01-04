<template lang="html">
  <section class="c-highlights o-top o-bottom">
    <div class="o-container c-highlights--wrapper">

      <carousel class="c-highlights-carousel" :slides="data.items" loop :autoplay="5">
        <template #default="slide">
          <div class="c-slide">
            <div class="c-slide-image" v-image:cover="slide.image.url"/>
            <div class="c-slide-card">
              hello
            </div>
          </div>
        </template>
      </carousel>

    </div>
  </section>
</template>

<script>
export default {
  props:['data']
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
    display: flex;
    justify-content: flex-start;
    align-items: center;
    @include rainbow-gradient;
  }
  .c-slide-image{
    @include cover;
    z-index: 1;
  }
  .c-slide-card{
    @include lime-gradient;
    z-index: 2;
    padding: $space;
  }
}
</style>
