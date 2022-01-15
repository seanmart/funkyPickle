<template lang="html">
  <div id="c-preloader">
    <div class="c-preloader-logo--wrapper">
      <logo vertical class="c-preloader-logo" />
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
    this.handleShow()
    this.complete = false

    this.$bus.$once('HIDE_PRELOADER',this.handleHide)
  },
  methods:{
    handleShow(){
      gsap.timeline()
          .to('#c-preloader .c-preloader-logo--wrapper',1,{opacity:1,scale:1,ease:'power2.out'},.5)
          .to('#c-preloader .ball',10,{rotate:360,ease: 'none',transformOrigin:'center center', repeat: -1},0)
          .to('#c-preloader',5,{backgroundPosition: '100%'},0)
    },
    handleHide(){
      gsap.timeline()
      .to('#c-preloader',.75,{y:'-100vh',ease: 'power4.in'})
      .to('#c-preloader .c-preloader-logo--wrapper',.75,{y:'100vh',ease: 'power4.in'},'<')
      .set('#c-preloader',{display:'none'},'>')
    }
  }
}
</script>

<style lang="scss">
#c-preloader{
  position: fixed;
  top:0px;
  left:0px;
  bottom: 0px;
  right: 0px;
  z-index: 200;
  @include rainbow-gradient;
  background-size: 400% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  .c-preloader-logo--wrapper{
    opacity: 0;
    transform: scale(.7);
  }

  .c-preloader-logo{
    fill: white;
    width: 200px;
  }
}
</style>
