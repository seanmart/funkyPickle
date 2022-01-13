<template lang="html">
  <main>
    <template v-for="(item,a) in data">
      <component v-if="item.hasComponent && item.primary.publish" :is="item.component" :data="item" />
    </template>
  </main>
</template>

<script>
import {checkComponents} from '@/assets/js/helpers'
export default {
  name: 'Page',
  data:()=>({data:[]}),
  async asyncData({ $prismic, route, error, store, payload }) {

    let page = route.path.replace('/','')
    let data = null

    if (payload && payload.data) data = await checkComponents(payload.data.body)
    if (store.state.page[page])  data = store.state.page[page]

    if (!data){
      let results = await $prismic.api.getByUID('page', page || 'home')
      if (results){
        data = await checkComponents(results.data.body)
        store.commit('page',{page,data})
      }
    }

    if (data) return {data}
    error({ statusCode: 404, message: 'Page not found'})
  },
  mounted(){
    this.$nextTick(()=>this.$store.commit('pageLoaded',true))
  }
}
</script>
