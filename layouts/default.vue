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
  </div>
</template>

<script>
export default {
  created(){
    if(process.server) return
    this.initCreated()
  },
  mounted(){
    this.$bus.$emit('LOADED')
  },
  watch:{
    $route(){
      this.$refs.scroller.scrollTo(0,0)
      ScrollTrigger.getAll().length > 0 && ScrollTrigger.refresh(true)
      gsap.to('#scroller',.5,{delay:.25, opacity:1,onComplete:()=>{
        this.$bus.$emit('REVEAL')
      }})
    }
  },
  middleware({route, from}){
    if (process.server || from.path == route.path) return;
    return new Promise(res =>{
      gsap.to('#scroller',.5,{opacity:0,onComplete:res})
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
