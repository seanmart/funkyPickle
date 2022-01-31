<template lang="html">
  <main id="c-404">
    <div class="c-404--wrapper">
      <h1 class="c-404__title t-header u-marg-bottom-lg">out of bounds!</h1>
      <p class="">The page your looking for doen't exist</p>
    </div>
  </main>
</template>

<script>
export default {
  layout:'default',
  mounted() {
    this.$bus.$emit("LOADED");
  },
};
</script>

<style lang="scss">
#c-404 {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: $lime;

  .c-404--wrapper {
    text-align: center;
    color: $pink;
  }

  .c-404__title {
    font-size: 8rem;
  }
}
</style>
