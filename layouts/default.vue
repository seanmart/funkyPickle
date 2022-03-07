<template lang="html">
  <div id="site" class="text-16 md:text-14 xl:text-12">
    <layout-preloader @complete="$bus.$emit('REVEAL')"/>
    <layout-navigation/>
    <div id="scroller" class="md:pl-nav-side">
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

let linksIndex = {}
let transitionProps = {dir:'y',value:50}
let colors = [
  config.theme.colors.pink,
  config.theme.colors.green,
  config.theme.colors.black
]

let transitionOn = ()=>{
  return new Promise((res)=>{
    gsap.to('#scroller',.5,{
      [transitionProps.dir]:transitionProps.value,
      opacity:0,
      ease:'power2.in',
      onComplete:res
    })
  })
}

let transitionOff = ()=>{
  return new Promise((res)=>{
    gsap.timeline({delay:.1,onComplete:res})
    .set('#scroller',{[transitionProps.dir]:transitionProps.value * -1})
    .to('#scroller',.5,{[transitionProps.dir]:0,opacity:1,ease:'power2.out'})
    .set(['#scroller'],{clearProps:'all'})
  })
}

export default {
  created(){
    if(process.server) return
    this.initGsap()
    this.initBus()
    this.initResize()
    this.initScroller()
    this.initLinksIndex()
  },
  watch:{
    $route(){
      gsap.to('#background .strip',.5,{fill:()=>colors[random(0,2)]})
    }
  },
  methods:{
    initBus(){
      this.$bus.$once('LOADED',()=> this.$bus.$on('LOADED',this.handleLoaded))
      this.$bus.$on('REVEAL',this.handleReveal)
    },
    initGsap(){
      gsap.registerPlugin(ScrollTrigger);
      gsap.registerPlugin(ScrollToPlugin);
    },
    initScroller(){
      window.scroller = document.getElementById('scroller')
    },
    initResize(){
      let timeout = null
      let html = document.documentElement
      window.addEventListener('resize',()=>{
        timeout && clearTimeout(timeout)
        timeout = setTimeout(()=> html.classList.remove('is-resizing'),100)
        html.classList.add('is-resizing')
      })
    },
    initLinksIndex(){
      linksIndex['/'] = 1
      this.$store.state.settings.links.forEach((l,i) => linksIndex[l.to] = i + 2 )
    },
    async handleLoaded(){
      await transitionOff()
      this.$bus.$emit('REVEAL')
    },
    handleReveal(){
      ScrollTrigger.getAll().length > 0 && ScrollTrigger.refresh(true)
    }
  },
  async middleware({from,route,$bus}){
    if (process.server || !from || from.path == route.path) return;

    let fx = linksIndex[from.path]
    let tx = linksIndex[route.path]

    transitionProps = {
      dir: !tx || !fx ? 'x' :'y',
      value: !tx || tx > fx ? -50 : 50
    }

    $bus.$emit('TOP_NAV',true)
    await transitionOn()
  }
}
</script>
