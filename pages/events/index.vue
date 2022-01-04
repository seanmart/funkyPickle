<template lang="html">
  <main>
    this is the events page index
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
