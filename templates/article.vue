<template lang="html">
<main id="article">
  <section class="o-container">
    article goes here
  </section>
</main>
</template>

<script>
export default {
  mounted() {
    this.$bus.$emit("LOADED");
  },
}
</script>

<style lang="scss">
</style>
