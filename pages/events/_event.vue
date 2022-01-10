<template lang="html">
  <main id="event">
    this is an event
  </main>
</template>

<script>
export default {
  mounted(){
    this.$store.commit('pageLoaded',true)
  }
}
</script>

<style lang="scss">
</style>
