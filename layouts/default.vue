<template lang="html">
  <div id="site">
    <svg-gradients />
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
          this.handleHide();
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
    handleHide(){
      let preLoader = document.getElementById('c-preloader')
      gsap.timeline({onComplete:() => this.$bus.$emit("REVEAL")})
      .to('#c-preloader',.75,{y:'-100vh',ease: 'power4.in'})
      .to('#c-preloader .c-preloader-logo--wrapper',.75,{y:'100vh',ease: 'power4.in'},'<')
      .add(()=> preLoader.remove(),'>')
    },
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

<style lang="scss">
#c-preloader{
  position: fixed;
  top:0px;
  left:0px;
  bottom: 0px;
  right: 0px;
  z-index: 200;
  @include rainbow-gradient;
  background-size: 400% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  .c-preloader-logo--wrapper{
    opacity: 0;
    transform: scale(.7);
  }

  .c-preloader-logo{
    fill: white;
    width: 200px;
  }
}
</style>
