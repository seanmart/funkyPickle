<template lang="html">
  <section class="landing" ref="landing">
    <div class="media--wrapper">
      <div class="media--image" v-image:cover="data.image.url" ref="img"/>
    </div>
  </section>
</template>

<script>
export default {
  props:{data:Object},
  mounted(){
    this.$nextTick(this.init)
  },
  methods:{
    init(){
      gsap.to(this.$refs.img,1,{scale:1.1,ease: 'none', scrollTrigger:{
        id: 'landing',
        trigger:this.$refs.landing,
        start: 'top top',
        scrub: true
      }})
    }
  },
  destroyed(){
    ScrollTrigger.getById('landing').kill()
  }
}
</script>

<style lang="scss">
  .landing{
    overflow: hidden;

    .media--wrapper{
      position: relative;
      padding-bottom: 50%;
      width:100%;
    }

    .media--image{
      position: absolute;
      top:0px;
      left:0px;
      right:0px;
      bottom:0px;
    }

  }
</style>
