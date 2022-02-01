<template lang="html">
  <main id="events">
    <template v-if="data">
      <big-ball/>
      <intro :title="data.title"/>
      <event-list :link="false"/>
    </template>
  </main>
</template>

<script>
export default {
  async asyncData({ $prismic, $bus, params, error, store, payload }) {

    if (store.state.pages.events) {
      return { data: store.state.pages.events };
    }

    if (payload && payload.data) {
      return { data: { ...payload.data } };
    }

    let res = await $prismic.api.getSingle("events");
    if (res) {
      let data = { ...res.data };
      store.commit("PAGE", { key:'events', data });
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
</style>
