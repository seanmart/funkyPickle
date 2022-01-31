<template lang="html">
  <main :key="$route.path" :id="page">
    <template v-for="(item, a) in data">
      <component v-if="item.hasComponent && item.primary.publish" :is="item.component" :data="item" />
    </template>
  </main>
</template>

<script>
import {checkComponents} from '~/@js/helpers'
export default {
  async asyncData({store,$prismic,route,payload,error}){

    let page = route.path.replaceAll("/", "") || 'home';

    if (store.state.pages[page]) {
      return { data: store.state.pages[page], page };
    }

    if (payload && payload.data) {
      let data = await checkComponents(payload.data.body);
      return { data, page };
    }

    let res = await $prismic.api.getByUID("page", page);

    if (res) {
      let data = await checkComponents(res.data.body);
      store.commit("PAGE", { key: page, data });
      return { data, page };
    }

    error({ statusCode: 404, message: "Page not found" });
  },
  data:()=>({
    data:null,
    page:null
  }),
  mounted(){
    this.$bus.$emit('LOADED')
  }
}
</script>

<style lang="scss">
</style>
