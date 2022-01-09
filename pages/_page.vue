<template lang="html">
  <main>
    <slices :data="data"/>
  </main>
</template>

<script>
export default {
  data:()=>({data:[]}),
  async asyncData({ $prismic, params, error, store, payload }) {
    if (payload) return {data:payload}

    let page = params.page || 'home'
    let data = await store.dispatch('page',page)
    if (data) return {data}

    error({ statusCode: 404, message: 'Page not found'})
  },
  mounted(){
    this.$store.commit('pageLoaded',true)
  }
}
</script>
