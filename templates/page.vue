<template lang="html">
  <main id="page" :key="page">
    <slices :data="data"/>
  </main>
</template>

<script>
export default {
  async asyncData({ store, route, $prismic }) {
    let res = null;
    let page = route.path.replaceAll("/", "") || 'home';

    if (!store.state.pages[page]) {
      res = await $prismic.api.getByUID('page',page);
      res && store.commit("PAGE", [page, res.data.body]);
    }
    let data = store.state.pages[page] || null;
    if (data) return { data,page };
  },
  data:()=>({
    data: [],
    page: null
  })
}
</script>
