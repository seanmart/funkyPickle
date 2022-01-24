<template lang="html">
  <section class="c-landing o-container-wide">
    <div class="c-landing--wrapper">
      <div class="c-reveal" />
      <div class="c-image">
        <fancy-image :image="data.primary.image.url" :scale="1.3" :start="0" :trigger="'.c-landing'" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["data"],
  mounted() {
    this.$bus.$once("REVEAL", this.handleReveal);
    this.handleMounted();
  },
  methods: {
    handleMounted() {
      gsap.timeline()
      .set(".c-landing .c-reveal", { scaleY: 0, transformOrigin: "top", display: "block" })
      .set(".c-landing .c-image", { scale: 1.2, opacity: 0 });
    },
    handleReveal() {
      gsap.timeline()
        .to(".c-landing .c-reveal", 0.75, { scaleY: 1, ease: "power4.in" })
        .set(".c-landing .c-image", { opacity: 1 })
        .to(".c-landing .c-reveal", 0.75, { scaleY: 0, transformOrigin: "bottom", ease: "power4.out" }, 0.8)
        .to(".c-landing .c-image", 2, { scale: 1, ease: "power4.out" }, "<")
        .set(".c-landing .c-reveal", { clearProps: "all" })
        .set(".c-landing .c-image", { clearProps: "all" });
    },
  },
};
</script>

<style lang="scss">
.c-landing {

  .c-landing--wrapper{
    position: relative;
    overflow: hidden;
  }

  .c-reveal {
    @include cover;
    @include lime-gradient;
    z-index: 1;
    display: none;
  }
  .c-image {
    height: 135vw;
    max-height: 100vh;
  }

  @media screen and (min-width: $medium){
    .c-image {
      height: 700px;
    }
  }
}
</style>
