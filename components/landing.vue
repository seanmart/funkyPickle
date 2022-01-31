<template lang="html">
  <section class="c-landing o-container u-cover-container" ref="container">
    <div class="c-landing__media u-cover" ref="media">
      <figure v-if="img" ref="image" class="c-landing__image" v-image:cover="img"/>
    </div>
  </section>
</template>

<script>
export default {
  props: ["data","image"],
  mounted() {
    if (this.$refs.image){
      gsap.to(this.$refs.image,1,{scale:1.3,ease:'none', scrollTrigger:{
        trigger: this.$refs.container,
        start: 'top top',
        end: 'bottom top',
        scrub:true
      }})
    }
  },
  computed:{
    img(){
      if(this.image) return this.image
      if(this.data) return this.data.primary.image.url
      return null
    }
  }
}
</script>

<style lang="scss">
  .c-landing{
    height: 600px;
    overflow: hidden;
    background: $black;

    .c-landing__image{
      height: 100%;
      background-position: center -20px -20px;
    }

    @media(min-width: $screen-sm){
      height:650px;
    }
  }
</style>
