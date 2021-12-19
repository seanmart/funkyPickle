<template lang="html">
  <main v-if="" class="page--margin">
    <div class="page--content">
      <template v-for="(item,a) in data">
        <component v-if="item.primary.publish" :is="item.slice_type.replace(/_/g, '-')" :data="item" />
      </template>
    </div>
    <signup/>
  </main>
</template>

<script>
export default {
  async asyncData({ $prismic, params, error, store, payload }) {

    if (payload){
      return {data:payload}
    }

    let data = null
    let page = !params.page ? 'home' : params.page

    if (store.state.pages[page]){
      data = store.state.pages[page]
    } else {
      try{
        const results = (await $prismic.api.getByUID('page', page)).data
        data = results.body
        store.commit('setPage',{page, data })
      } catch (e) {
        error({ statusCode: 404, message: 'Page not found' })
      }
    }
    setTimeout(()=>store.commit('setTransition',false),500)
    return {data}
  }
}
</script>
