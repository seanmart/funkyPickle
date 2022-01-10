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
  data:()=>({data:[]}),
  async asyncData({ $prismic, route, error, store, payload }) {

    let page = route.path.replace('/','')

    if (payload){
      let payloadData = await checkComponents(payload.data.body)
      console.log(payloadData)
      return {data: payloadData}
    }

    if (store.state.page[page]){
      return {data:store.state.page[page]}
    }

    let results = await $prismic.api.getByUID('page', page || 'home')

    if (results){
      let data = await checkComponents(results.data.body)
      store.commit('page',{page,data})
      return {data}
    }

    error({ statusCode: 404, message: 'Page not found'})
  },
  mounted(){
    this.$store.commit('pageLoaded',true)
  }
}
</script>
