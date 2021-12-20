<template lang="html">
  <main class="page--margin">
    <div class="page--content">
      <slices :data="data"/>
    </div>
    <signup/>
  </main>
</template>

<script>
export default {
  data:()=>({data:[]}),
  async asyncData({ $prismic, params, error, store, payload }) {

    if (payload) return {data:payload}

    await store.dispatch('getPage',params.page)
    return {data: store.state.pages[params.page]}
  },
  mounted(){
    this.$store.commit('setTransition',false)
  }
}
</script>
