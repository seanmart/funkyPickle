<template lang="html">
  <main :key="$route.path">
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

    let page = route.path.replace("/", "");
    let data = null

    if (payload && payload.data) {
      data = await checkComponents(payload.data.body);
    } else if (store.state.pages[page]){
      data = store.state.pages[page]
    } else {
      let res = await $prismic.api.getByUID("page", page || "home");
      if (res) {
        data = await checkComponents(res.data.body);
        store.commit("pages", { page, data });
      }
    }

    if(data) return { data };

    error({ statusCode: 404, message: "Page not found" });
  },
  created(){
    this.$bus.$emit('LOADING',true)
  },
  mounted(){
    this.$bus.$emit('LOADING',false)
  },
  data: () => ({
    data: [],
  }),
};
</script>
