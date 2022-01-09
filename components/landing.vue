<template lang="html">
  <section class="c-landing o-bottom" v-reveal="{before,after}">
    <div class="o-wrapper">
      <div class="c-reveal"/>
      <fancy-image class="c-image" :image="data.primary.image.url" :scale="1.3" start="top top" :trigger="'.c-landing'" />
    </div>
  </section>
</template>

<script>
export default {
  props:['data'],
  methods:{
    before(){
      gsap.timeline()
      .set('.c-landing .c-reveal',{scaleY:0,transformOrigin:'top',display:'block'})
      .set('.c-landing .c-image',{scale:1.2,opacity:0})
    },
    after(){
      gsap.timeline()
      .to('.c-landing .c-reveal',.75,{scaleY:1,ease:'power4.in'})
      .set('.c-landing .c-image',{opacity:1})
      .to('.c-landing .c-reveal',.75,{scaleY:0,transformOrigin:'bottom',ease:'power4.out'},.8)
      .to('.c-landing .c-image',2,{scale:1,ease:'power4.out'},'<')
      .set('.c-landing .c-reveal',{clearProps:'all'})
      .set('.c-landing .c-image',{clearProps:'all'})
    }
  }
}
</script>

<style lang="scss">
.c-landing{

  .c-reveal{
    @include cover;
    @include lime-gradient;
    z-index: 1;
    display: none;
  }
  .c-image{
    height: 700px;
    max-height: 90vh;
  }
}
</style>
