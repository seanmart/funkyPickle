<template lang="html">
  <div id="site" class="text-16 md:text-14 xl:text-12 md:pl-nav-side">
    <layout-navigation/>
    <transition mode="out-in" @beforeEnter="beforeEnter">
      <nuxt :key="$route.path"/>
    </transition>
    <layout-signup/>
    <layout-footer/>
    <layout-svg-gradients/>
    <layout-background/>
    <layout-preloader @complete="$bus.$emit('REVEAL')"/>
  </div>
</template>

<script>

let linksIndex = {}
let transitionProps = {dir:'y',val:-50}

export default {
  created(){
    if(process.server) return
    this.initGsap()
    this.initBus()
    this.initResize()
    this.initLinksIndex()
  },
  mounted(){
    document.documentElement.style.opacity = 1
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
      linksIndex = {'/':1}
      this.$store.state.settings.links.forEach((l,i) => linksIndex[l.to] = i + 2 )
    },
    handleLoaded(){
      gsap.timeline({onComplete:()=>this.$bus.$emit('REVEAL')})
      .to('#page',.5,{[transitionProps.dir]:0,opacity:1,ease:'power2.out'})
      .set('#page',{clearProps:'all'})
    },
    handleReveal(){
      ScrollTrigger.getAll().length > 0 && ScrollTrigger.refresh(true)
    },
    beforeEnter(el){
      gsap.set(el,{[transitionProps.dir]:transitionProps.val * -1,opacity:0})
    }
  },
  middleware({from,route}){
    if (process.server) return
    return new Promise((res)=>{

      let fx = linksIndex[from.path]
      let tx = linksIndex[route.path]

      transitionProps = {
        dir: !tx || !fx ? 'x' :'y',
        val: !tx || tx > fx ? -50 : 50
      }

      gsap.to('#page',.5,{[transitionProps.dir]:transitionProps.val,opacity:0,ease:'power2.in',onComplete:()=>{
        window.scrollTo(0,0)
        res()
      }})
    })
  }
}
</script>
