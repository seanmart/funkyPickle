<template lang="html">
  <div id="site" class="light-blue text-16 md:text-14 xl:text-12">
    <layout-preloader/>
    <layout-navigation/>
    <div id="scroller" class="md:pl-nav-side" ref="scroller">
      <nuxt/>
      <layout-signup/>
      <layout-footer/>
    </div>
    <layout-svg-gradients/>
    <layout-background/>
  </div>
</template>

<script>
import config from '@/tailwind.config.js'
import {random} from '@/assets/helpers'
export default {
  created(){
    if(process.server) return
    this.initCreated()
  },
  mounted(){
    this.$bus.$emit('LOADED')
    this.$bus.$on('REVEAL',()=> ScrollTrigger.refresh())
  },
  watch:{
    $route(){
      this.$refs.scroller.scrollTo(0,0)
      ScrollTrigger.getAll().length > 0 && ScrollTrigger.refresh(true)
      gsap.timeline({delay:.25,onComplete:()=>this.$bus.$emit('REVEAL')})
          .set('#scroller',{scale:.95})
          .to('#background',.75,{scale:1,ease:'expo.inOut'})
          .to('#background .bg',.75,{opacity:0,ease:'expo.inOut'},'<')
          .to('#background .strip',.75,{opacity:.05,ease:'expo.inOut',fill:config.theme.colors.blue},'<')
          .to('#scroller',.75,{scale:1,opacity:1,ease:'expo.inOut'},'<')
          .set(['#background','#background .bg','#background .strip','#scroller'],{clearProps:'all'})

    }
  },
  middleware({from,route,$bus}){
    if (process.server || !from || from.path == route.path) return;
    let colors = [
      config.theme.colors.lime,
      config.theme.colors.pink,
      config.theme.colors.green,
      config.theme.colors.black
    ]
    return new Promise(res =>{
      $bus.$emit('TOP_NAV',true)
      let bg = colors.splice(random(0,colors.length -1),1)
      gsap.timeline({onComplete:res})
          .set('#background .bg',{background:bg},0)
          .to('#scroller',.75,{scale:.95,opacity:0,ease:'expo.inOut'},'<')
          .to('#background',.75,{scale:1.05,ease:'expo.inOut'},'<')
          .to('#background .bg',.75,{opacity:1,ease:'expo.inOut'},'<')
          .to('#background .strip',.75,{opacity:1,ease:'expo.inOut',fill:()=> colors[random(0,colors.length - 1)]},'<')
          .set('#scroller',{scale:1})
    })
  },
  methods:{
    initCreated(){
      let timeout = null
      let html = document.documentElement

      gsap.registerPlugin(ScrollTrigger);
      gsap.registerPlugin(ScrollToPlugin);

      window.scroller = document.getElementById('scroller')
      !isMobile && ScrollTrigger.defaults({scroller: "#scroller",pinType: 'fixed'});

      window.addEventListener('resize',()=>{
        timeout && clearTimeout(timeout)
        timeout = setTimeout(()=> {html.classList.remove('is-resizing')},100)
        html.classList.add('is-resizing')
      })
    },
  }
}
</script>
