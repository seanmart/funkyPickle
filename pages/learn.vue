<template lang="html">
  <main>learn</main>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(() => this.$store.dispatch("loadingComplete"));
  },
};
</script>

<style lang="scss"></style>
