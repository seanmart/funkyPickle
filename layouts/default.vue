<template lang="html">
  <div id="site">
    <preloader/>
    <svg-gradients />
    <columns />
    <the-navigation />
    <div id="scroller">
      <nuxt v-if="render" />
      <the-footer />
    </div>
  </div>
</template>

<script>
let isFirstLoad = true;
export default {
  data: () => ({
    render: false,
  }),
  mounted() {
    this.handleInit();
    this.handleResize()

    this.$bus.$on("LOADED", () => {

      let action = isFirstLoad ? 'HIDE_PRELOADER' : 'HIDE_COLUMNS'
      let duration = isFirstLoad ? 1500 : 500
      isFirstLoad = false

      setTimeout(() => {
        !isMobile && scrollBuddy.reset();
        ScrollTrigger.refresh(true);
        this.$bus.$emit(action,()=> this.$bus.$emit("REVEAL"))
      }, duration)

    });

    this.render = true;

  },
  methods: {
    handleInit() {
      gsap.registerPlugin(ScrollTrigger);

      if (!isMobile) {
        scrollBuddy.init({el: "#scroller",event: ScrollTrigger.update,inertia: 0.1,});
        ScrollTrigger.defaults({scroller: "#scroller"});
        ScrollTrigger.scrollerProxy("#scroller", {
          scrollTop: (value) => scrollBuddy.top,
          getBoundingClientRect: () => ({
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          }),
        });
      }
    },
    handleResize(){
      let timeout = null
      window.addEventListener('resize',()=>{
        timeout && clearTimeout(timeout)
        document.body.classList.add('is-resizing')
        timeout = setTimeout(()=> document.body.classList.remove('is-resizing'),200)
      })
    }
  },
  middleware({ $bus, route, from }) {
    if (process.server || isFirstLoad) return;
    if (from.path == route.path) return;
    return new Promise((next) => $bus.$emit("SHOW_COLUMNS", next));
  },
};
</script>
