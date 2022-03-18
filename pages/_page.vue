<template lang="html">
  <main id="page" :key="$route.path">
    <Landing v-if="data.title" :image="data.image" :title="data.title"/>
    <StickyHeader v-if="header" :items="header" scrollId="#page" ref="header" mobileLabel="Sections"/>
    <Slices :slices="slices" class="page-content"/>
  </main>
</template>

<script>
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
  }),
  mounted(){
    this.$bus.$emit('LOADED')
  },
  computed:{
    header(){
      let header = []
      if(!this.data.header) return false
      this.slices.forEach(s => {
        if (s.primary.title  && typeof s.primary.title == 'string'){
          header.push({
            label: s.primary.title,
            href:`#${s.id}`,
            onClick:()=> this.scrollTo(s.id)
          })
        }
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
  },
  methods:{
    scrollTo(id){
      let el = document.getElementById(id).childNodes[0]
      gsap.to(window,1,{ease: 'power2.out', scrollTo:{y:el,offsetY: this.$refs.header.$el.offsetHeight + 50}})
    }
  }
}
</script>
