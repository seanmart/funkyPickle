<template lang="html">
  <div id="c-columns">
    <div v-for="i in 4" :key="i" class="c-column--wrapper">
      <div :class="`c-column c-column-${i + 1}`" />
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
    this.$bus.$on('SHOW_COLUMNS',(sender)=>this.showColumns(sender))
    this.$bus.$on('HIDE_COLUMNS',(sender)=>this.hideColumns(sender))
  },
  methods: {
    showColumns(sender) {
      gsap
        .timeline({ onComplete: () => this.$bus.$emit('COLUMNS_VISIBLE',sender)})
        .set("#c-columns", { zIndex: 99 })
        .to("#c-columns .c-column", 0.5, { x: 0, ease: "power2.out", stagger: 0.07 });
    },
    hideColumns(sender) {
      gsap
        .timeline({ onComplete: () => this.$bus.$emit('COLUMNS_HIDDEN',sender) })
        .to("#c-columns .c-column", 0.5, { x: "101%", ease: "power2.out", stagger: 0.07 }, 0)
        .set("#c-columns", { clearProps: "all" })
        .set("#c-columns .c-column", { clearProps: "all" });
    },
  },
};
</script>

<style lang="scss">
#c-columns {
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: $navigation-width;
  z-index: -1;
  display: flex;
  flex-direction: row;

  .c-column--wrapper {
    flex: 1 1 auto;
    overflow: hidden;
  }

  .c-column {
    background: white;
    height: 100%;
    width: 100%;
    transform: translateX(-101%);
  }

  @media screen and (max-width: $tablet) {
    left: 0px;
    top: $navigation-height;
  }
}
</style>
