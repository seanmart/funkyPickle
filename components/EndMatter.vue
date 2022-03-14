<template lang="html">
  <footer class="bg-pink text-white text-center">
    <Container>
      <prismic-rich-text :field="data.text"/>
    </Container>
  </footer>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: mapState({
    data: state => state.settings.footer
  })
}
</script>

<style lang="css" scoped>
</style>
