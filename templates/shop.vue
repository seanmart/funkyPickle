<template lang="html">
  <main>
    shop
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
