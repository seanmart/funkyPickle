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
    await store.dispatch('single','home')
    return {data: store.state.pages.home}
  },
  mounted(){
    this.$store.commit('ready',true)
  }
}
</script>
