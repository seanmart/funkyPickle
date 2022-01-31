<template lang="html">
  <div id="site">
    <the-preloader v-if="renderPreloader"/>
    <the-svg-gradients />
    <the-page-transition/>
    <the-side-nav/>
      <div id="scroller">
        <div id="page">
          <nuxt v-if="renderContent"/>
        </div>
        <the-footer/>
      </div>
  </div>
</template>

<script>
export default {
  data:()=>({
    renderContent: false,
    renderPreloader: true
  }),
  created(){
    if(process.server) return
    this.initCreated()
  },
  mounted(){
    this.$bus.$on('REVEAL',this.refresh)
    this.$bus.$on('REFRESH',this.refresh)
    this.$bus.$once('REVEAL',()=> this.renderPreloader = false)

    !isMobile && this.initSmoothScroll()

    this.renderContent = true
  },
  watch:{
    $route(){
      !isMobile && scrollBuddy.reset()
    }
  },
  methods:{
    initCreated(){
      let timeout = null
      let { userAgent, maxTouchPoints, platform } = navigator
      let conditional = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      let html = document.documentElement

      window.isMobile = conditional.test(userAgent) || (platform === "MacIntel" && maxTouchPoints > 1);
      html.classList.add('has-js')
      html.classList.add(window.isMobile ? 'is-mobile' : 'is-desktop')

      window.addEventListener('resize',()=>{
        timeout && clearTimeout(timeout)
        timeout = setTimeout(()=> {html.classList.remove('is-resizing')},100)
        html.classList.add('is-resizing')
      })
    },
    initSmoothScroll(){
      gsap.registerPlugin(ScrollTrigger);
      scrollBuddy.init({
        el: "#scroller",
        event: ScrollTrigger.update,
        inertia: 0.11,
      });
      ScrollTrigger.defaults({scroller: "#scroller"});
      ScrollTrigger.scrollerProxy("#scroller", {
        scrollTop: (value) => scrollBuddy.top,
        getBoundingClientRect: () => ({top: 0,left: 0,width: window.innerWidth,height: window.innerHeight}),
      });
    },
    refresh(){
      ScrollTrigger.getAll().length > 0 && ScrollTrigger.refresh(true)
      !isMobile && scrollBuddy.update()
    }
  },
  middleware({ $bus, route, from }) {
    if (process.server || !from) return;
    if (from.path == route.path) return;
    return new Promise((next) => $bus.$emit("LEAVE", next));
  },
};
</script>
<style lang="scss">

  #page{
    min-height: 100vh;
    width: 100vw;
    overflow: hidden;
  }

  .is-resizing *{
    transition: none !important;
  }

  @media(min-width: $screen-md) {
    #page {
      padding-left: $nav-side;
    }
  }
</style>
