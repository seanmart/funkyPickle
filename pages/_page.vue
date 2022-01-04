<template lang="html">
  <main>
    <slices :data="data"/>
    <!--<signup/>-->
  </main>
</template>

<script>
export default {
  data:()=>({data:[]}),
  async asyncData({ $prismic, params, error, store, payload }) {

    if (payload) return {data:payload}

    await store.dispatch('page',params.page)
    let data = store.state.pages[params.page]
    if (data) return {data}
    error({ statusCode: 404 })
  },
  mounted(){
    this.$store.commit('ready',true)
  }
}
</script>
