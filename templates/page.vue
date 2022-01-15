<template lang="html">
  <main>
    <template v-for="(item, a) in data">
      <component v-if="item.hasComponent && item.primary.publish" :is="item.component" :data="item" />
    </template>
  </main>
</template>

<script>
import { checkComponents } from "@/assets/js/helpers";
export default {
  name: "Page",
  async asyncData({ $prismic, route, error, store, payload }) {
    store.commit("loading", true);

    let page = route.path.replace("/", "");

    if (payload && payload.data) {
      let data = await checkComponents(payload.data.body);
      return { data };
    }

    if (store.state.pages[page]) return { data: store.state.pages[page] };

    let res = await $prismic.api.getByUID("page", page || "home");
    if (res) {
      let data = await checkComponents(res.data.body);
      store.commit("page", { page, data });
      return { data };
    }

    error({ statusCode: 404, message: "Page not found" });
  },
  data: () => ({
    data: [],
  }),
  mounted() {
    this.$nextTick(() => this.$store.dispatch("loadingComplete"));
  },
};
</script>
