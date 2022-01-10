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

    let data = await store.dispatch('page','about')
    if (data) return {data}

    error({ statusCode: 404, message: 'Page not found'})
  },
  mounted(){
    this.$store.commit('pageLoaded',true)
  }
}
</script>
