<template lang="html">
  <section class="text-and-image block block--fullwidth">

    <div v-if="data.primary.title" class="header--wrapper">
      <h1 class="title--bg" v-html="data.primary.title"/>
    </div>

    <div class="content--wrapper">
      <div v-if="data.primary.text" class="text--wrapper">
        <div class="text--rg" v-html="$prismic.asHtml(data.primary.text)"/>
      </div>
      <div v-if="data.primary.image" class="image--wrapper">
        <fancyImage :image="data.primary.image.url" :distance="100" :height="imageRatio(data.primary.image)" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props:{data:Object},
  methods:{
    imageRatio(image){
      return `${image.dimensions.height / image.dimensions.width * 100}%`
    }
  }
}
</script>

<style lang="scss">
.text-and-image{

  .header--wrapper{
    margin-bottom: 5rem;
  }

  .content--wrapper{
    display: flex;
  }

  .text--wrapper{
    flex: 0 0 40%;
    padding-right: 10rem;
    color: lighten($black,20%)
  }

  .image--wrapper{
    flex: 0 0 60%;

    .image{
      width: 100%;
    }
  }
}
</style>
