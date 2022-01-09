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

    await store.dispatch('page','events')
    let data = store.state.pages.events
    if (data) return {data}
    error({ statusCode: 404 })
  },
  mounted(){
    this.$store.commit('ready',true)
  }
}
</script>
