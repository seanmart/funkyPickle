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
  async asyncData({ redirect, store, route, $prismic, payload }) {
    let res = null;
    let page = route.path.replaceAll("/", "") || 'home';
    let data = store.state.pages[page];

    if (payload){
      store.commit("PAGE", [page,payload.data])
      data = payload.data
    };

    if (!data) {
      res = await $prismic.api.getByUID('page',page);
      if(res){
        store.commit("PAGE", [page, res.data]);
        data = res.data
      }
    }

    if (data) return { data,page }
    redirect('/404')

  },
  data:()=>({
    data: {},
    resolver
  }),
  mounted(){
    this.$bus.$emit('LOADED')
  },
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
