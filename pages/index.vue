<template lang="html">
  <main id="page" ref="page">

    <home-landing :data="data"/>

    <template v-for="(slice,i) in slices">
      <component :is="slice.component" :data="slice" :class="{'is-last': i == slices.length - 1}"/>
    </template>

  </main>
</template>

<script>
import {camelize} from '@/assets/helpers'
export default {
  name: 'Home',
  async asyncData({ store, route, $prismic }) {
    let res = null;

    if (!store.state.pages.home) {
      res = await $prismic.api.getSingle('home');
      res && store.commit("PAGE", ['home', res.data]);
    }
    let data = store.state.pages.home || null;
    if (data) return { data };
  },
  data:()=>({
    data: [],
  }),
  mounted(){

    this.$nextTick(()=>{
      this.$loaded('.image',{background: true},()=> this.$bus.$emit('LOADED'))
    })

  },
  computed:{
    slices(){
      let slices = []
      this.data.body.forEach(i => i.primary.publish && slices.push({
        ...i,
        component:`section-${camelize(i.slice_type)}`
      }))
      return slices
    }
  }
}
</script>

<style media="screen">


</style>
