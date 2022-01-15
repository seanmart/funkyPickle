<template lang="html">
  <div id="site">
    <svg-gradients />
    <preloader/>
    <columns />
    <navigation />
    <div id="scroller">
      <nuxt v-if="render" />
      <signup />
      <end-matter />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    render: false,
  }),
  mounted() {
    this.handleInit();
    this.render = true;
    this.first = true
    this.count = 0

    this.$bus.$on('LOADING',(isLoading)=>{
      this.count = this.count + (isLoading ? 1 : -1)
      this.count == 0 && this.$bus.$emit('LOADED')
    })

    this.$bus.$on('LOADED',()=>{
      this.first && setTimeout(()=>this.$bus.$emit('HIDE_PRELOADER',()=> this.$bus.$emit('REVEAL')),1500)
      !this.first && setTimeout(()=>this.$bus.$emit('HIDE_COLUMNS',()=> this.$bus.$emit('REVEAL')),500)
      this.first = false
    })

    this.$bus.$on('REVEAL',()=>{
      !isMobile && scrollBuddy.reset()
      ScrollTrigger.refresh(true)
    })

  },
  methods: {
    handleInit() {

      gsap.registerPlugin(ScrollTrigger);

      if (!isMobile) {
        scrollBuddy.init({
          el: "#scroller",
          event: ScrollTrigger.update,
          inertia: 0.1,
        });

        ScrollTrigger.scrollerProxy("#scroller", {
          scrollTop: (value) => scrollBuddy.top,
          getBoundingClientRect: () => ({
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          }),
        });

        ScrollTrigger.defaults({
          scroller: "#scroller",
        });
      }
    },
  },
  middleware({$bus}) {
    if (process.server) return;
    return new Promise((next)=> $bus.$emit('SHOW_COLUMNS',next))
  },
};
</script>
