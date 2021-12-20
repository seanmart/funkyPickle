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
  async asyncData({ $prismic, params, error, store, payload }) {

    if (payload) return {data:payload}

    let data = null

    if (store.state.pages.home){
      data = store.state.pages.home
    } else {
      try{
        const results = (await $prismic.api.getSingle('home')).data
        data = results.body
        store.commit('setPage',{page: 'home', data })
      } catch (e) {
        error({ statusCode: 404, message: 'Page not found' })
      }
    }
    setTimeout(()=>store.commit('setTransition',false),500)
    return {data}
  },
  data:()=>({data:[]})
}
</script>
