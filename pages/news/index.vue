<template lang="html">
  <main id="news-list">
    news list
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
