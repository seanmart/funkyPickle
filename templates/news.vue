<template lang="html">
  <main id="news">
    <template v-if="data">
      <intro :title="data.title"/>
    </template>
  </main>
</template>

<script>
export default {
  async asyncData({ $prismic, $bus, params, error, store, payload }) {

    if (store.state.pages.news) {
      return { data: store.state.pages.news };
    }

    if (payload && payload.data) {
      return { data: { ...payload.data } };
    }

    let res = await $prismic.api.getSingle("news");
    if (res) {
      let data = { ...res.data };
      store.commit("PAGE", { key:'news', data });
      return { data };
    }

    error({ statusCode: 404, message: "Page not found" });
  },
  mounted() {
    this.$bus.$emit("LOADED");
  },
  data: () => ({
    data: null
  })
}
</script>

<style lang="scss">
#news{
  background: $black;
  color: white;
  height: 100%;
}
</style>
