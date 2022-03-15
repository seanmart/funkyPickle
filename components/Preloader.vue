<template lang="html">
  <div id="preloader" class="bg-white fixed inset-0 z-top flex flex-col justify-center items-center overflow-hidden shadow-bottom" v-if="render">
    <logo color class="preloader-logo relative block w-200"/>
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
      this.loop = gsap.to('#preloader .preloader-logo .fp-logo-ball',20,{rotate:360,ease:'none',repeat:-1,transformOrigin:'center'},0)

      gsap.timeline({delay:.5,onComplete:()=> this.preloaderLoaded = true})
          .set('#preloader .preloader-logo',{opacity: 1},0)
          .from('#preloader .preloader-logo .fp-logo-ball',1,{opacity:0,y:'-50%',ease: 'expo.inOut'},'<')
          .from('#preloader .preloader-logo .fp-logo-frame',1,{scale:.5,transformOrigin:'center',opacity:0,ease:'expo.inOut'},'<+=.5')
          .from('#preloader .preloader-logo .fp-logo-bg',1,{scale:.5,transformOrigin:'center',opacity:0,ease:'expo.inOut'},'<')
          .from('#preloader .preloader-logo .fp-logo-letters path',1.25,{opacity:0,scale:.5,transformOrigin:'center',stagger:.05,ease:'elastic.inOut'},'<+=.5')
    },
    hidePreloader(){
      gsap.timeline({delay:.5,onComplete:()=> this.render = false})
          .to('#preloader .preloader-logo',1,{opacity:0,scale:.9,transformOrigin:'center',ease:'expo.inOut'},'<')
          .to('#preloader',1,{y:'-100vh',ease:'expo.out'},'<+=.5')
          .to('#preloader .preloader-logo',1,{y:'100vh',ease:'expo.out'},'<')
          .add(()=> this.$bus.$emit('REVEAL'),'<+=.25')
          .add(()=> this.loop && this.loop.kill())
    }
  }
}
</script>

<style lang="css">
  .no-js #preloader{
    display: none;
  }
  #preloader .preloader-logo{
    opacity: 0
  }
  #preloader .preloader__bar{
    transform: scaleX(0);
    transform-origin: left center;
  }
</style>
