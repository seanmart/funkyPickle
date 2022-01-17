<template lang="html">
  <div id="site">
    <svg-gradients />
    <preloader />
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
let isFirst = true;
export default {
  data: () => ({
    render: false,
  }),
  mounted() {
    this.handleInit();

    this.$bus.$on("LOADED", () => {
      isFirst &&
        setTimeout(() => {
          this.resetScroll();
          this.$bus.$emit("HIDE_PRELOADER", () => this.$bus.$emit("REVEAL"));
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
      }
    },
  },
  middleware({ $bus, route, from }) {
    if (process.server || isFirst) return;
    if (from.path == route.path) return;
    return new Promise((next) => $bus.$emit("SHOW_COLUMNS", next));
  },
};
</script>
