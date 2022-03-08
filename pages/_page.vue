<template lang="html">
  <main id="page" :key="page">
    <template v-for="(slice,i) in slices">
      <component :is="slice.component" :data="slice" :class="{'is-first':i == 0, 'is-last': i == slices.length - 1}"/>
    </template>
  </main>
</template>

<script>
import {camelize} from '@/assets/helpers'
export default {
  async asyncData({ store, route, $prismic }) {
    let res = null;
    let page = route.path.replaceAll("/", "");

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
  }),
  mounted(){
    this.$nextTick(()=>{
      this.$loaded('.image',{background: true},()=> this.$bus.$emit('LOADED'))
    })
  },
  computed:{
    slices(){
      let slices = []
      this.data.forEach(i => i.primary.publish && slices.push({
        ...i,
        component:`section-${camelize(i.slice_type)}`
      }))
      return slices
    }
  }
}
</script>
