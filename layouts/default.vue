<template lang="html">
  <div class="md:pl-nav-side">
    <Preloader/>
    <NavMobile/>
    <NavSide/>

    <transition
      mode="out-in"
      @leave="leave"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
    >
      <nuxt :key="$route.path"/>
    </transition>

    <Signup/>
    <EndMatter/>
    <Background/>

  </div>
</template>

<script>
export default {
  created(){
    if (process.server) return
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

    let timeout = null
    let html = document.documentElement
    window.addEventListener('resize',()=>{
      timeout && clearTimeout(timeout)
      timeout = setTimeout(()=> html.classList.remove('is-resizing'),100)
      html.classList.add('is-resizing')
    })
  },
  mounted(){
    document.documentElement.style.opacity = 1
  },
  data:()=>({
    to:null,
    from:null,
  }),
  watch:{
    $route(to,from){
      let dir = 'y'
      let val = 50
      let fromIndex = this.pages[from.path] || 1000
      let toIndex = this.pages[to.path] || 1000

      if(fromIndex > 999 || toIndex > 999) dir = 'x'

      this.from = {[dir]: fromIndex < toIndex ? -val : val }
      this.to = {[dir]: fromIndex < toIndex ? val : -val }

    }
  },
  computed:{
    pages(){
      if(!this.$store.state.settings.links) return {}
      let pages = {'/':1}
      this.$store.state.settings.links.forEach((l,i) => {
        pages[`/${l.primary.link.uid}`] = i + 2
      })
      return pages
    }
  },
  methods:{
    leave(el,done){
      gsap.to(el,.5,{...this.from,ease:'power2.in',opacity:0,onComplete:done})
    },
    beforeEnter(el){
      window.scrollTo(0,0)
      gsap.set(el,{...this.to,opacity:0})
    },
    enter(el,done){
      gsap.to(el,.5,{x:0,y:0,opacity:1,ease:'power2.out',onComplete:done})
    },
    afterEnter(el){
      gsap.set(el,{clearProps:'all'})
    }
  }
}
</script>
