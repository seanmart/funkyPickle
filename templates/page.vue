<template lang="html">
  <main :key="$route.path">
    <template v-for="(item, a) in data">
      <component v-if="item.hasComponent && item.primary.publish" :is="item.component" :data="item" />
    </template>
  </main>
</template>

<script>
import { checkComponents,pause } from "@/assets/js/helpers";
export default {
  name: "Page",
  async asyncData({ $prismic, route, error, store, payload }) {

    let page = route.path.replace("/", "");

    if (store.state.pages[page]){
      return {data:store.state.pages[page]}
    }

    if (payload && payload.data) {
      let data = await checkComponents(payload.data.body);
      return {data}
    }

    let res = await $prismic.api.getByUID("page", page || "home");
    if (res) {
      let data = await checkComponents(res.data.body);
      store.commit("pages", { page, data });
      return {data}
    }

    error({ statusCode: 404, message: "Page not found" });
  },
  mounted(){
    this.$bus.$emit('LOADED')
  },
  data: () => ({
    data: [],
  }),
};
</script>
