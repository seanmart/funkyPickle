<template lang="html">
  <footer class="bg-pink text-white">
    <container inner noY class="flex flex-col justify-center items-center">
      <the-logo horizontal knockout animate class="w-1/2 max-w-200 fill-white"/>
      <div class="mt-20 text-center" v-html="$prismic.asHtml(data.text)"/>
    </container>
  </footer>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed:{
    ...mapState({
      data: state => state.settings.footer
    })
  },
}
</script>

<style lang="css">
</style>
