<template lang="html">
  <div id="site">
    <preloader v-if="showPreloader"/>
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
let isFirst = true;
export default {
  data: () => ({
    render: false,
    showPreloader: true
  }),
  mounted() {
    this.handleInit();

    this.$bus.$on("LOADED", () => {
      isFirst &&
        setTimeout(() => {
          this.resetScroll();
          this.$bus.$emit('HIDE_PRELOADER',()=>{
            this.$bus.$emit("REVEAL")
            this.showPreloader = false
          })
          isFirst = false;
        }, 1500);

      !isFirst &&
        setTimeout(() => {
          this.resetScroll();
          this.$bus.$emit("HIDE_COLUMNS", () => this.$bus.$emit("REVEAL"));
        }, 500);

      !isMobile && scrollBuddy.reset();
    });

    this.render = true;
  },
  methods: {
    resetScroll() {
      !isMobile && scrollBuddy.update();
      ScrollTrigger.refresh(true);
    },
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

        let timeout = null
        window.addEventListener('resize',()=>{
          timeout && clearTimeout(timeout)
          document.body.classList.add('is-resizing')
          timeout = setTimeout(()=> document.body.classList.remove('is-resizing'),200)
        })
      }
    },
  },
  middleware({ $bus, route, from }) {
    if (process.server || isFirst) return;
    if (from.path == route.path) return;
    return new Promise((next) => {
      $bus.$emit("SHOW_COLUMNS", next)
    });
  },
};
</script>
