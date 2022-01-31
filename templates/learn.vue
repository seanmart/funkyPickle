<template lang="html">
  <main>
    learn
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
