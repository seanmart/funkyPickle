<template lang="html">
  <main id="now" class="page-margin">
    Happening Now
  </main>
</template>

<script>
export default {
  mounted(){
    !isMobile && scrollBuddy.reset()
  }
}
</script>

<style lang="scss">
</style>
