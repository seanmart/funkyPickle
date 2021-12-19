<template lang="html">
  <main id="now" class="learn">
    learn
  </main>
</template>

<script>
export default {
  fetch({ store }) {
    return store.dispatch("getLearn");
  }
}
</script>

<style lang="scss">

</style>
