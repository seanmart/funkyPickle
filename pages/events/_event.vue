<template lang="html">
  <main>
    this is an event
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
