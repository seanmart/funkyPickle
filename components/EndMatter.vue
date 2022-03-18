<template lang="html">
  <footer class="bg-pink text-white text-center">
    <Container>
      <prismic-rich-text :field="data.text"/>
      <div class="mt-20 flex flex-row justify-center">
        <template v-for="item in data.social">
          <a target="_blank" :href="item.link.url" class="flex-initial mx-10px">
            <img :src="item.icon.url" :alt="item.name" class="h-30px"/>
          </a>
        </template>
      </div>
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
