<template lang="html">
  <main id="page">

    <Landing v-if="data.title" :image="data.image" :title="data.title"/>

    <StickyHeader v-if="header" :items="header" scrollId="#page"/>

    <SliceZone :slices="slices" :resolver="resolver" class="page-content"/>
  </main>
</template>

<script>
import {resolver} from '@/assets/helpers'
export default {
  name: 'Page',
  async asyncData({ store, route, $prismic }) {
    let res = null;
    let page = route.path.replaceAll("/", "") || 'home';

    if (!store.state.pages[page]) {
      res = await $prismic.api.getByUID('page',page);
      res && store.commit("PAGE", [page, res.data]);
    }
    let data = store.state.pages[page] || null;
    if (data) return { data,page };
  },
  data:()=>({
    data: {},
    resolver
  }),
  computed:{
    header(){
      if(!this.data.header) return false

      let header = []
      this.slices.forEach(s => {
        s.primary.title  && typeof s.primary.title == 'string' && header.push({label: s.primary.title,id:s.id})
      })
      return header
    },
    slices(){
      if(!this.data.slices) return []

      let slices = []
      this.data.slices.forEach((s,i) => {
        (s.primary.publish || s.primary.publish == null) && slices.push({...s,id:`${s.slice_type}-${i}`})
      })
      return slices
    }
  }
}
</script>
