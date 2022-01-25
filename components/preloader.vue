<template lang="html">
  <div id="c-preloader">
    <div class="c-preloader-logo--wrapper">
      <logo class="c-preloader-logo" vertical knockout/>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
    gsap.timeline()
    .to('#c-preloader .c-preloader-logo--wrapper',1,{opacity:1,scale:1,ease:'power2.out'},.5)
    .to('#c-preloader .ball',10,{rotate:360,ease: 'none',transformOrigin:'center center', repeat: -1},0)
    .to('#c-preloader',5,{backgroundPosition: '100%'},0)

    this.$bus.$once('HIDE_PRELOADER',(cb)=>{
      gsap.timeline({onComplete:cb})
      .to('#c-preloader',.75,{y:'-100vh',ease: 'power4.in'})
      .to('#c-preloader .c-preloader-logo--wrapper',.75,{y:'100vh',ease: 'power4.in'},'<')
    })
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
  }
  #c-preloader .c-preloader-logo--wrapper{
    opacity: 0;
    transform: scale(.7);
  }
  #c-preloader .c-preloader-logo{
    fill: white;
    width: 200px;
  }

  #c-preloader .ball{
    transform-origin: center center;
  }
</style>
