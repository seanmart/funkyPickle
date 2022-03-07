<template lang="html">
  <div id="preloader" class="bg-white fixed inset-0 z-50 flex flex-col justify-center items-center overflow-hidden shadow-bottom" v-if="render">
    <logo class="preloader__logo relative block w-200" vertical/>
  </div>
</template>

<script>
export default {
  data:()=>({
    render: true,
    siteLoaded: false,
    preloaderLoaded: false,
    preloaderHidden: false
  }),
  watch:{
    siteLoaded(){
      this.preloaderLoaded && this.hidePreloader()
    },
    preloaderLoaded(){
      this.siteLoaded && this.hidePreloader()
    }
  },
  mounted(){
    this.$bus.$once('LOADED',()=> this.siteLoaded = true)
    this.showPreloader()
  },
  methods:{
    showPreloader(){
      this.loop = gsap.to('#preloader .preloader__logo .fp-logo__ball',20,{rotate:360,ease:'none',repeat:-1,transformOrigin:'center'},0)

      gsap.timeline({delay:.5,onComplete:()=> this.preloaderLoaded = true})
          .set('#preloader .preloader__logo',{opacity: 1},0)
          .from('#preloader .preloader__logo .fp-logo__ball',1,{opacity:0,y:'-50%',ease: 'expo.inOut'},'<')
          .from('#preloader .preloader__logo .fp-logo__frame',1,{scale:.5,transformOrigin:'center',opacity:0,ease:'expo.inOut'},'<+=.5')
          .from('#preloader .preloader__logo .fp-logo__bg',1,{scale:.5,transformOrigin:'center',opacity:0,ease:'expo.inOut'},'<')
          .from('#preloader .preloader__logo .fp-logo__letters path',1.25,{opacity:0,scale:.5,transformOrigin:'center',stagger:.05,ease:'elastic.inOut'},'<+=.5')
    },
    hidePreloader(){
      gsap.timeline({delay:.5,onComplete:()=> this.render = false})
          .to('#preloader .preloader__logo',1,{opacity:0,scale:.9,transformOrigin:'center',ease:'expo.inOut'},'<')
          .to('#preloader',1,{y:'-100vh',ease:'expo.out'},'<+=.5')
          .to('#preloader .preloader__logo',1,{y:'100vh',ease:'expo.out'},'<')
          .add(()=> this.$emit('complete'),'<+=.25')
          .add(()=> this.loop && this.loop.kill())
    }
  }
}
</script>

<style lang="css">
  .no-js #preloader{
    display: none;
  }
  #preloader .preloader__logo{
    opacity: 0
  }
  #preloader .preloader__bar{
    transform: scaleX(0);
    transform-origin: left center;
  }
</style>
