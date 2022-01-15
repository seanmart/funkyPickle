<template lang="html">
  <section class="c-landing o-bottom">
    <div class="o-wrapper">
      <div class="c-reveal" />
      <fancy-image class="c-image" :image="data.primary.image.url" :scale="1.3" :start="0" :trigger="'.c-landing'" />
    </div>
  </section>
</template>

<script>
export default {
  props: ["data"],
  mounted() {
    gsap.timeline();
  },
};
</script>

<style lang="scss">
.c-landing {
  .c-reveal {
    @include cover;
    @include lime-gradient;
    z-index: 1;
    display: none;
  }
  .c-image {
    height: 700px;
    max-height: 90vh;
  }
}
</style>
