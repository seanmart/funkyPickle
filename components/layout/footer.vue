<template lang="html">
  <footer class="bg-pink text-white">
    <container noY class="flex flex-col justify-center items-center py-40">
      <logo horizontal knockout animate class="w-1/2 max-w-150 fill-white"/>
      <div class="mt-20 flex flex-row">
        <template v-for="item in data.social">
          <a target="_blank" :href="item.link.url" class="flex-initial mx-10px">
            <img :src="item.icon.url" :alt="item.name" class="h-30px"/>
          </a>
        </template>
      </div>
      <prismic-rich-text :field="data.text" :htmlSerializer="htmlSerializer" class="mt-20 text-center"/>
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
  methods:{
    htmlSerializer(type, element, content, children){
      if (content && content.indexOf('{{year}}') > 0){
        return content.replace('{{year}}', new Date().getFullYear())
      }
    }
  }
}
</script>

<style lang="css">
</style>
