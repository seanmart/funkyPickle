<template lang="html">
  <div id="c-preloader">
    <div class="c-preloader-logo--wrapper">
      <logo vertical class="c-preloader-logo" />
    </div>
  </div>
</template>

<script>
export default {
  props:['hide'],
  data:()=>({
    isLoaded:false,
    shouldHide: false
  }),
  mounted(){
    gsap.timeline({delay:.5,onComplete: this.validate})
        .to('#c-preloader .c-preloader-logo--wrapper',1,{opacity:1,scale:1,ease:'power2.out'})
        .call(()=> this.isLoaded = true)

    gsap.to('#c-preloader .ball',10,{rotate:360,ease: 'none',transformOrigin:'center center', repeat: -1})
    gsap.to('#c-preloader',5,{backgroundPosition: '100%'})
  },
  watch:{
    hide(){
      this.shouldHide = true
      this.validate()
    }
  },
  methods:{
    validate(){
      this.isLoaded && this.shouldHide && this.handleHide()
    },
    handleHide(){
      gsap.timeline({onComplete: ()=> this.$emit('hidden')})
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
