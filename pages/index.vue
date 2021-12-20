<template lang="html">
  <main class="page-margin--left">
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

    await store.dispatch('getSingle','home')
    return {data: store.state.pages.home}
  },
  mounted(){
    this.$store.commit('setTransition',false)
  }
}
</script>
