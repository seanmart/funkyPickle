<template lang="html">
  <main id="article">
    this is an article
  </main>
</template>

<script>
export default {
  mounted(){
    this.$store.commit('ready',true)
  }
}
</script>

<style lang="scss">
</style>
